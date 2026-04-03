import { useState, useRef, useEffect } from 'react';
import { useFinverseStore } from '@/store/useFinverseStore';
import GlassCard from '@/components/GlassCard';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

// Auto insight suggestions based on persona
const getAutoInsights = (persona: string) => [
  'How can I reduce my monthly spending?',
  'What should I invest ₹5,000/month in?',
  'Review my portfolio allocation',
  'Am I on track for retirement?',
];

const AIAssistant = () => {
  const data = useFinverseStore((s) => s.getPersonaData());
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: `Hi ${data.name.split(' ')[0]}! 👋 I'm your AI financial assistant. I can help you with budgeting, investment advice, tax planning, and more. What would you like to know?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg || loading) return;
    setInput('');

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: msg };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    // TODO: Replace with real OpenAI API call via Supabase edge function
    // For now, simulate a response
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateMockResponse(msg, data.name),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 glass-strong px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
            <Bot className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-lg font-bold">AI Assistant</h1>
            <p className="text-[10px] text-muted-foreground">Powered by OpenAI</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 pt-4 space-y-3">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full gradient-primary mt-1">
                  <Bot className="h-3.5 w-3.5 text-primary-foreground" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'gradient-primary text-primary-foreground rounded-br-sm'
                    : 'glass rounded-bl-sm'
                }`}
              >
                {msg.content}
              </div>
              {msg.role === 'user' && (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted mt-1">
                  <User className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full gradient-primary">
              <Bot className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <div className="glass rounded-2xl rounded-bl-sm px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-2 w-2 rounded-full bg-primary animate-bounce" />
                <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.15s' }} />
                <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.3s' }} />
              </div>
            </div>
          </motion.div>
        )}

        {/* Auto insight suggestions */}
        {messages.length <= 1 && (
          <div className="space-y-2 pt-2">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Sparkles className="h-3 w-3" /> Try asking:
            </p>
            {getAutoInsights(data.name).map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="block w-full text-left rounded-xl border border-primary/20 bg-primary/5 px-4 py-2.5 text-sm text-foreground/80 transition-all hover:bg-primary/10 hover:border-primary/40"
              >
                {q}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="sticky bottom-20 z-20 px-4 pb-2">
        <div className="glass-strong flex items-center gap-2 rounded-2xl px-4 py-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask anything about your finances..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary transition-opacity disabled:opacity-50"
          >
            <Send className="h-4 w-4 text-primary-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Simple mock responses — will be replaced with OpenAI edge function
function generateMockResponse(query: string, name: string): string {
  const q = query.toLowerCase();
  if (q.includes('spend') || q.includes('expense') || q.includes('budget')) {
    return `Based on your spending patterns, I'd recommend:\n\n1. **Reduce dining out** — you're spending ~₹8K/month on food delivery\n2. **Set a weekly budget** of ₹2,000 for discretionary spending\n3. **Use the 50/30/20 rule** — 50% needs, 30% wants, 20% savings\n\nWould you like me to create a detailed budget plan?`;
  }
  if (q.includes('invest') || q.includes('sip') || q.includes('mutual')) {
    return `Great question! For a ₹5,000/month SIP, I'd recommend:\n\n1. **₹2,500 in Nifty 50 Index Fund** — low cost, broad exposure\n2. **₹1,500 in Flexi Cap Fund** — active management for alpha\n3. **₹1,000 in International Fund** — global diversification\n\nHistorically, this mix has returned ~12-14% CAGR. Start early for maximum compounding! 📈`;
  }
  if (q.includes('portfolio') || q.includes('allocation')) {
    return `Here's my analysis of your portfolio:\n\n✅ **Strengths**: Good mix of equity and debt\n⚠️ **Concern**: Crypto allocation might be too high for your risk profile\n💡 **Suggestion**: Consider rebalancing — move 5% from crypto to index funds\n\nYour current risk score: **7/10** (Aggressive)`;
  }
  if (q.includes('retire') || q.includes('goal')) {
    return `Let me calculate your retirement readiness:\n\n📊 At current savings rate of ~₹30K/month:\n• You'll accumulate **₹2.5 Cr** in 20 years (at 12% returns)\n• For a comfortable retirement, you need **₹4 Cr**\n\n💡 **Action**: Increase monthly investment by ₹15K to bridge the gap.\n\nWant me to create a detailed retirement plan?`;
  }
  return `That's a great question, ${name.split(' ')[0]}! Based on your financial profile, I'd recommend reviewing your current allocation and ensuring you have:\n\n1. **Emergency fund** covering 6 months of expenses\n2. **Adequate insurance** coverage\n3. **Diversified investments** across asset classes\n\nWould you like me to dive deeper into any of these areas?`;
}

export default AIAssistant;
