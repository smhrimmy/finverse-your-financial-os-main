import React, { useEffect } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { theme as appTheme } from './app/constants/theme';
import { View, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useFinverseStore } from './app/store/useFinverseStore';
import { listenToAuthChanges } from './app/services/finverseService';

import HomeScreen from './app/screens/HomeScreen';
import ExpensesScreen from './app/screens/ExpensesScreen';
import PortfolioScreen from './app/screens/PortfolioScreen';
import FinanceScreen from './app/screens/FinanceScreen';
import AIScreen from './app/screens/AIScreen';
import AuthScreen from './app/screens/AuthScreen';
import { QuickActionSheet } from './app/components/QuickActionSheet';
import { RecordFormModal } from './app/components/RecordFormModal';

const Tab = createBottomTabNavigator();

const NavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: appTheme.colors.background,
    card: appTheme.colors.background,
    text: appTheme.colors.text,
    primary: appTheme.colors.accentBlue,
  },
};

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -20,
      justifyContent: 'center',
      alignItems: 'center',
      ...styles.shadow
    }}
    onPress={onPress}
  >
    <View style={{
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: appTheme.colors.fab,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      {children}
    </View>
  </TouchableOpacity>
);

export default function App() {
  const initializeApp = useFinverseStore((state) => state.initializeApp);
  const initialized = useFinverseStore((state) => state.initialized);
  const isAuthenticated = useFinverseStore((state) => state.isAuthenticated);
  const openActionSheet = useFinverseStore((state) => state.openActionSheet);
  const resetAuthState = useFinverseStore((state) => state.resetAuthState);

  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  useEffect(() => {
    const unsubscribe = listenToAuthChanges((session) => {
      if (session?.user) {
        initializeApp(true);
        return;
      }

      resetAuthState();
    });

    return unsubscribe;
  }, [initializeApp, resetAuthState]);

  if (!initialized) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={appTheme.colors.accentBlue} size="large" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return (
      <NavigationContainer theme={NavigationTheme}>
        <AuthScreen />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer theme={NavigationTheme}>
      <>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
              position: 'absolute',
              bottom: 25,
              left: 20,
              right: 20,
              elevation: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: 15,
              height: 70,
              borderWidth: 1,
              borderColor: appTheme.colors.cardBorder,
              ...styles.shadow,
            },
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Expenses') {
                iconName = focused ? 'pie-chart' : 'pie-chart-outline';
              } else if (route.name === 'Portfolio') {
                iconName = focused ? 'briefcase' : 'briefcase-outline';
              } else if (route.name === 'Finance') {
                iconName = focused ? 'card' : 'card-outline';
              } else if (route.name === 'AI') {
                iconName = focused ? 'planet' : 'planet-outline';
              }

              if (route.name !== 'Add') {
                return <Ionicons name={iconName} size={size} color={color} />;
              }
            },
            tabBarActiveTintColor: appTheme.colors.accentBlue,
            tabBarInactiveTintColor: appTheme.colors.textSecondary,
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen
            name="Expenses"
            component={ExpensesScreen}
            options={{
              href: null,
              tabBarButton: () => null,
            }}
          />
          <Tab.Screen name="Portfolio" component={PortfolioScreen} />
          <Tab.Screen
            name="Add"
            component={HomeScreen}
            options={{
              tabBarIcon: () => (
                <Ionicons name="add" size={32} color="#000" />
              ),
              tabBarButton: (props) => (
                <CustomTabBarButton {...props} />
              ),
            }}
            listeners={() => ({
              tabPress: (event) => {
                event.preventDefault();
                openActionSheet();
              },
            })}
          />
          <Tab.Screen name="Finance" component={FinanceScreen} />
          <Tab.Screen name="AI" component={AIScreen} />
        </Tab.Navigator>
        <QuickActionSheet />
        <RecordFormModal />
      </>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: appTheme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  }
});
