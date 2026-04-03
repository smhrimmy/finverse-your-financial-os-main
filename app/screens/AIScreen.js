import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, SafeAreaView, ActivityIndicator } from 'react-native';
import { theme } from '../constants/theme';
import { GlassCard } from '../components/GlassCard';
import { useFinverseStore } from '../store/useFinverseStore';

// PLACEHOLDER: Replace with your actual OpenAI API Key in a real app (use .env)
const OPENAI_API_KEY = "YOUR_API_KEY";

export default function AIScreen() {
  const { activePersona } = useFinverseStore();
  const [messages, setMessages] = useState([
    { id: '1', role: 'assistant', content: `Hi ${activePersona.name.split(' ')[0]}, I'm your AI Financial Advisor. How can I help you today?` }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef();

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const newUserMessage = { id: Date.now().toString(), role: 'user', content: inputText };
    setMessages(prev => [...prev, newUserMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // REAL OPENAI API INTEGRATION
      // Make sure to add your API key above to test this
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo", // Or gpt-4 if you have access
          messages: [
            { 
              role: "system", 
              content: `You are FinVerse AI, a premium, intelligent financial advisor for a user in India. 
              The user is: ${activePersona.name}. 
              Their net worth is ₹${activePersona.netWorth}. 
              Keep your answers concise, practical, and focused on wealth building, tax saving, or budgeting in the Indian context (using ₹).`
            },
            // Include previous messages for context
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: "user", content: newUserMessage.content }
          ],
          max_tokens: 150,
          temperature: 0.7,
        })
      });

      const data = await response.json();
      
      if (data.choices && data.choices[0]) {
        const assistantResponse = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.choices[0].message.content
        };
        setMessages(prev => [...prev, assistantResponse]);
      } else {
        // Fallback if API fails or key is missing
        throw new Error('API Error');
      }

    } catch (error) {
      console.error("OpenAI API Error:", error);
      const errorMsg = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I couldn't process that. (Did you set the OPENAI_API_KEY?)"
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = (msg) => {
    const isUser = msg.role === 'user';
    return (
      <View key={msg.id} style={[styles.messageWrapper, isUser ? styles.messageWrapperUser : styles.messageWrapperAssistant]}>
        <View style={[styles.messageBubble, isUser ? styles.messageBubbleUser : styles.messageBubbleAssistant]}>
          <Text style={[styles.messageText, isUser ? styles.messageTextUser : styles.messageTextAssistant]}>
            {msg.content}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>FinVerse AI</Text>
          <Text style={styles.headerSubtitle}>Powered by OpenAI</Text>
        </View>

        {/* Auto Insights Panel */}
        <View style={styles.insightsContainer}>
           <ScrollView horizontal showsHorizontalScrollIndicator={false}>
             <TouchableOpacity style={styles.insightChip} onPress={() => setInputText("How can I reduce my food spending?")}>
               <Text style={styles.insightChipText}>"Reduce food spending"</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.insightChip} onPress={() => setInputText("Where should I invest ₹5K/month?")}>
               <Text style={styles.insightChipText}>"Invest ₹5K/month"</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.insightChip} onPress={() => setInputText("How to save tax this year?")}>
               <Text style={styles.insightChipText}>"Save tax"</Text>
             </TouchableOpacity>
           </ScrollView>
        </View>

        {/* Chat Area */}
        <ScrollView 
          style={styles.chatArea} 
          contentContainerStyle={styles.chatContent}
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map(renderMessage)}
          {isLoading && (
            <View style={[styles.messageWrapper, styles.messageWrapperAssistant]}>
              <View style={[styles.messageBubble, styles.messageBubbleAssistant, { padding: theme.spacing.m }]}>
                <ActivityIndicator size="small" color={theme.colors.accentBlue} />
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input Area */}
        <GlassCard style={styles.inputCard} intensity={20}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Ask about your finances..."
              placeholderTextColor={theme.colors.textSecondary}
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
            <TouchableOpacity 
              style={[styles.sendButton, !inputText.trim() && { opacity: 0.5 }]} 
              onPress={handleSend}
              disabled={!inputText.trim() || isLoading}
            >
              <Text style={styles.sendButtonText}>↑</Text>
            </TouchableOpacity>
          </View>
        </GlassCard>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
  },
  header: {
    padding: theme.spacing.m,
    paddingTop: theme.spacing.xl,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.cardBorder,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 12,
    color: theme.colors.accentBlue,
  },
  insightsContainer: {
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.cardBorder,
  },
  insightChip: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    borderRadius: 20,
    marginRight: theme.spacing.s,
    borderColor: theme.colors.cardBorder,
    borderWidth: 1,
  },
  insightChipText: {
    color: theme.colors.text,
    fontSize: 12,
  },
  chatArea: {
    flex: 1,
  },
  chatContent: {
    padding: theme.spacing.m,
    paddingBottom: theme.spacing.xxl,
  },
  messageWrapper: {
    marginBottom: theme.spacing.m,
    flexDirection: 'row',
  },
  messageWrapperUser: {
    justifyContent: 'flex-end',
  },
  messageWrapperAssistant: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.m,
  },
  messageBubbleUser: {
    backgroundColor: theme.colors.accentBlue,
    borderBottomRightRadius: 4,
  },
  messageBubbleAssistant: {
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  messageTextUser: {
    color: '#000', // Dark text on light blue bubble
    fontWeight: '500',
  },
  messageTextAssistant: {
    color: theme.colors.text,
  },
  inputCard: {
    margin: theme.spacing.m,
    marginBottom: Platform.OS === 'ios' ? theme.spacing.m : theme.spacing.m,
    padding: theme.spacing.xs,
    borderRadius: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.m,
  },
  input: {
    flex: 1,
    color: theme.colors.text,
    fontSize: 16,
    maxHeight: 100,
    minHeight: 40,
    paddingTop: 10,
    paddingBottom: 10,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.accentBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: theme.spacing.s,
  },
  sendButtonText: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  }
});
