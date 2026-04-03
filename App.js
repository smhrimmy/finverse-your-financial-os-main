import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { theme as appTheme } from './app/constants/theme';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

// Import Screens
import HomeScreen from './app/screens/HomeScreen';
import ExpensesScreen from './app/screens/ExpensesScreen';
import PortfolioScreen from './app/screens/PortfolioScreen';
import FinanceScreen from './app/screens/FinanceScreen';
import AIScreen from './app/screens/AIScreen';

const Tab = createBottomTabNavigator();

// Custom Theme for Navigation
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

// Custom FAB Button Component
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
  return (
    <NavigationContainer theme={NavigationTheme}>
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
            backgroundColor: 'rgba(255, 255, 255, 0.05)', // Glassmorphism base
            borderRadius: 15,
            height: 70,
            borderWidth: 1,
            borderColor: appTheme.colors.cardBorder,
            ...styles.shadow
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

            // Return normal icon for non-FAB items
            if (route.name !== 'Add') {
              return <Ionicons name={iconName} size={size} color={color} />;
            }
          },
          tabBarActiveTintColor: appTheme.colors.accentBlue,
          tabBarInactiveTintColor: appTheme.colors.textSecondary,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Portfolio" component={PortfolioScreen} />
        
        {/* Middle FAB Button */}
        <Tab.Screen 
          name="Add" 
          component={HomeScreen} // This will be intercepted by the FAB action, so component doesn't matter much
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons name="add" size={32} color="#000" />
            ),
            tabBarButton: (props) => (
              <CustomTabBarButton {...props} />
            )
          }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              // TODO: Open Bottom Sheet Modal for quick actions instead of navigating
              alert('Open Quick Actions Bottom Sheet');
            },
          })}
        />
        
        <Tab.Screen name="Finance" component={FinanceScreen} />
        <Tab.Screen name="AI" component={AIScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
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
