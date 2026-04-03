

## FinVerse — Financial Operating System for Life

### Overview
A premium, dark-themed financial super app with glassmorphism UI, 5 main screens, 4 persona profiles, real OpenAI AI assistant, full Supabase backend with auth and user profiles.

### Design System
- **Background**: `#0D0D0D` dark theme throughout
- **Cards**: Glassmorphism (backdrop-blur, semi-transparent backgrounds, subtle borders)
- **Accent**: Neon blue (`#3B82F6`) to purple (`#8B5CF6`) gradients
- **Profit/Loss**: Green `#22C55E` / Red `#EF4444`
- **Typography**: Clean, modern with ₹ currency formatting
- **Feel**: Apple CarPlay meets crypto dashboard — smooth transitions, clean data viz

### Navigation
- Bottom tab bar with 5 items: Home, Expenses, FAB (center floating +), Portfolio, AI
- Stack navigation within each tab for detail views

### Screen 1 — Home Dashboard
- Greeting header with avatar, notification bell, persona dev-toggle dropdown
- Net Worth card with animated line chart (Cash, Investments, Crypto, EPF breakdown)
- AI Insight cards ("You overspent ₹3,200 this week", "SIP returns up 12%")
- Quick action buttons: Add Expense, Add Investment, Pay EMI, Add Insurance

### Screen 2 — Expenses & Income
- Monthly bar chart (income vs expenses)
- Pie chart for category breakdown (Food, Rent, Transport, etc.)
- Scrollable transaction list with swipe-to-delete/edit
- Add expense modal

### Screen 3 — Portfolio
- Tabs: Stocks / Crypto / Mutual Funds
- Each asset: name, current value, P&L (color-coded), mini sparkline
- Tap to expand detailed view with full chart

### Screen 4 — Finance
- **Insurance section**: Policy cards with name, coverage amount, next premium date
- **Loans section**: EMI amount, remaining balance, visual progress bar
- Add insurance/loan via modal

### Screen 5 — AI Assistant
- Chat UI with message bubbles
- Real OpenAI API integration via Supabase edge function (user provides their own key)
- Auto-generated financial insight suggestions
- Conversation history persisted in database

### FAB (Floating Action Button)
- Center tab button opens bottom sheet modal
- Options: Add Expense, Add Investment, Add Insurance, Add Loan
- Each opens a form modal

### Persona System (Dev Mode)
- Toggle in header switches between 4 mock personas:
  - **Salaried** (₹50K–₹1.5L/mo): SIP, EPF, home loan
  - **High Earner** (₹2L+/mo): stocks, crypto heavy
  - **Fresher** (₹25K–₹50K/mo): minimal assets
  - **Business Owner**: irregular income, GST tracking
- Switching persona changes all displayed financial data

### Backend (Supabase)
- **Auth**: Email/password signup & login
- **Profiles table**: display name, avatar URL, preferences
- **Database tables**: transactions, portfolio_assets, loans, insurance_policies, chat_messages
- **Edge function**: `openai-chat` — proxies to OpenAI API using user-provided key stored as Supabase secret
- **RLS**: All user data scoped to authenticated user

### Reusable Components
- `GlassCard`, `NetWorthCard`, `InsightCard`, `TransactionItem`
- `PortfolioCard`, `LoanCard`, `InsuranceCard`
- `FABButton`, `BottomSheetModal`, `ChartComponent`
- `PersonaSwitcher`, `ChatBubble`

### Charts
- Recharts library for line charts, bar charts, pie charts, and sparklines
- All styled to match dark theme with gradient fills

### Phase 1 Deliverable
All 5 screens fully functional with mock data, persona switching, auth flow, and real AI chat.

