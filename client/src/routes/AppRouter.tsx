import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { ProtectedRoute, GuestRoute } from './ProtectedRoute';
import { ROUTES } from '@/constants';

// View Pages
import { LandingPage } from '@/pages/Landing/LandingPage';
import { LoginPage } from '@/pages/Auth/LoginPage';
import { RegisterPage } from '@/pages/Auth/RegisterPage';
import { ForgotPasswordPage } from '@/pages/Auth/ForgotPasswordPage';
import { ResetPasswordPage } from '@/pages/Auth/ResetPasswordPage';
import { ProfilePage } from '@/pages/Profile/ProfilePage';
import { DashboardPage } from '@/pages/Dashboard/DashboardPage';
import { PortfolioPage } from '@/pages/Portfolio/PortfolioPage';
import { PortfolioHistoryPage } from '@/pages/Portfolio/PortfolioHistoryPage';
import { PortfolioRiskPage } from '@/pages/Portfolio/PortfolioRiskPage';
import { PortfolioAnalyticsPage } from '@/pages/Portfolio/PortfolioAnalyticsPage';
import { PortfolioPerformancePage } from '@/pages/Portfolio/PortfolioPerformancePage';
import { WatchlistPage } from '@/pages/Watchlist/WatchlistPage';
import { StockDetailsPage } from '@/pages/Stock/StockDetailsPage';
import { PredictionPage } from '@/pages/Prediction/PredictionPage';
import { AnalysisPage } from '@/pages/Analysis/AnalysisPage';
import { AnalysisHistoryPage } from '@/pages/Analysis/AnalysisHistoryPage';
import { PatternPage } from '@/pages/Patterns/PatternPage';
import { CandlestickPage } from '@/pages/Candlestick/CandlestickPage';
import { CopilotPage } from '@/pages/Copilot/CopilotPage';
import { CopilotWorkspacePage } from '@/pages/Copilot/CopilotWorkspacePage';
import { CopilotReportsPage } from '@/pages/Copilot/CopilotReportsPage';
import { CopilotHistoryPage } from '@/pages/Copilot/CopilotHistoryPage';
import { CopilotSettingsPage } from '@/pages/Copilot/CopilotSettingsPage';
import { NewsPage } from '@/pages/News/NewsPage';
import { NewsDetailsView } from '@/pages/News/components/NewsDetailsView';
import { NewsBookmarksPage } from '@/pages/News/NewsBookmarksPage';
import { ScreenerPage } from '@/pages/Screener/ScreenerPage';
import { ScannerPage } from '@/pages/Screener/ScannerPage';
import { SavedScreenerPage } from '@/pages/Screener/SavedScreenerPage';
import { ScannerHistoryPage } from '@/pages/Screener/ScannerHistoryPage';
import { AlertsPage } from '@/pages/Alerts/AlertsPage';
import { AlertBuilderPage } from '@/pages/Alerts/AlertBuilderPage';
import { AlertHistoryPage } from '@/pages/Alerts/AlertHistoryPage';
import { NotificationsPage } from '@/pages/Notifications/NotificationsPage';
import { NotificationSettingsPage } from '@/pages/Notifications/NotificationSettingsPage';
import { AdminPage } from '@/pages/Admin/AdminPage';
import { AdminUsersPage } from '@/pages/Admin/AdminUsersPage';
import { AdminRolesPage } from '@/pages/Admin/AdminRolesPage';
import { AdminSubscriptionsPage } from '@/pages/Admin/AdminSubscriptionsPage';
import { AdminProvidersPage } from '@/pages/Admin/AdminProvidersPage';
import { AdminSystemHealthPage } from '@/pages/Admin/AdminSystemHealthPage';
import { AdminAnalyticsPage } from '@/pages/Admin/AdminAnalyticsPage';
import { AdminAIOpsPage } from '@/pages/Admin/AdminAIOpsPage';
import { AdminLogsPage } from '@/pages/Admin/AdminLogsPage';
import { AdminSettingsPage } from '@/pages/Admin/AdminSettingsPage';
import { MLPage } from '@/pages/ML/MLPage';
import { ModelRegistryPage } from '@/pages/ML/ModelRegistryPage';
import { TrainingPipelinePage } from '@/pages/ML/TrainingPipelinePage';
import { InferencePage } from '@/pages/ML/InferencePage';
import { MetricsPage } from '@/pages/ML/MetricsPage';
import { PaperTradingPage } from '@/pages/PaperTrading/PaperTradingPage';
import { PaperPortfolioPage } from '@/pages/PaperTrading/PaperPortfolioPage';
import { PaperOrdersPage } from '@/pages/PaperTrading/PaperOrdersPage';
import { PaperHistoryPage } from '@/pages/PaperTrading/PaperHistoryPage';
import { PaperLeaderboardPage } from '@/pages/PaperTrading/PaperLeaderboardPage';
import { StrategyPage } from '@/pages/Strategy/StrategyPage';
import { StrategyBuilderPage } from '@/pages/Strategy/StrategyBuilderPage';
import { BacktestDashboardPage } from '@/pages/Strategy/BacktestDashboardPage';
import { StrategyHistoryPage } from '@/pages/Strategy/StrategyHistoryPage';
import { StrategyReportsPage } from '@/pages/Strategy/StrategyReportsPage';
import { BrokerPage } from '@/pages/Broker/BrokerPage';
import { BrokerAccountsPage } from '@/pages/Broker/BrokerAccountsPage';
import { BrokerTerminalPage } from '@/pages/Broker/BrokerTerminalPage';
import { PricingPage } from '@/pages/Billing/PricingPage';
import { BillingDashboardView } from '@/pages/Billing/BillingDashboardView';
import { BillingHistoryPage } from '@/pages/Billing/BillingHistoryPage';
import { BillingInvoicesPage } from '@/pages/Billing/BillingInvoicesPage';
import { SubscriptionPage } from '@/pages/Billing/SubscriptionPage';
import { SubscriptionManagePage } from '@/pages/Billing/SubscriptionManagePage';
import { ChatPage } from '@/pages/Chat/ChatPage';
import { SettingsPage } from '@/pages/Settings/SettingsPage';
import { NotFoundPage } from '@/pages/NotFound/NotFoundPage';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Landing */}
        <Route path={ROUTES.HOME} element={<LandingPage />} />

        {/* Guest Auth Routes */}
        <Route element={<GuestRoute />}>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
          <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
        </Route>

        {/* Protected Dashboard & App Layout Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path={ROUTES.PORTFOLIO} element={<PortfolioPage />} />
            <Route path="/portfolio/add" element={<PortfolioPage />} />
            <Route path="/portfolio/history" element={<PortfolioHistoryPage />} />
            <Route path="/portfolio/risk" element={<PortfolioRiskPage />} />
            <Route path="/portfolio/analytics" element={<PortfolioAnalyticsPage />} />
            <Route path="/portfolio/performance" element={<PortfolioPerformancePage />} />
            <Route path="/portfolio/:id" element={<PortfolioPage />} />
            <Route path={ROUTES.WATCHLIST} element={<WatchlistPage />} />
            <Route path="/watchlist/create" element={<WatchlistPage />} />
            <Route path="/watchlist/:id" element={<WatchlistPage />} />
            <Route path="/stocks/:symbol" element={<StockDetailsPage />} />
            <Route path="/stock/:symbol" element={<StockDetailsPage />} />
            <Route path={ROUTES.PREDICTION} element={<PredictionPage />} />
            <Route path="/predictions" element={<PredictionPage />} />
            <Route path="/predictions/:symbol" element={<PredictionPage />} />
            <Route path="/analysis" element={<AnalysisPage />} />
            <Route path="/analysis/upload" element={<AnalysisPage />} />
            <Route path="/analysis/history" element={<AnalysisHistoryPage />} />
            <Route path="/analysis/:id" element={<AnalysisPage />} />
            <Route path="/patterns" element={<PatternPage />} />
            <Route path="/patterns/:symbol" element={<PatternPage />} />
            <Route path="/candlestick" element={<CandlestickPage />} />
            <Route path="/candlesticks/:symbol" element={<CandlestickPage />} />
            <Route path="/copilot" element={<CopilotPage />} />
            <Route path="/copilot/workspace" element={<CopilotWorkspacePage />} />
            <Route path="/copilot/reports" element={<CopilotReportsPage />} />
            <Route path="/copilot/history" element={<CopilotHistoryPage />} />
            <Route path="/copilot/settings" element={<CopilotSettingsPage />} />
            <Route path={ROUTES.NEWS} element={<NewsPage />} />
            <Route path="/news/markets" element={<NewsPage />} />
            <Route path="/news/companies" element={<NewsPage />} />
            <Route path="/news/crypto" element={<NewsPage />} />
            <Route path="/news/economy" element={<NewsPage />} />
            <Route path="/news/bookmarks" element={<NewsBookmarksPage />} />
            <Route path="/news/:id" element={<NewsDetailsView />} />
            <Route path="/screener" element={<ScreenerPage />} />
            <Route path="/scanner" element={<ScannerPage />} />
            <Route path="/scanner/saved" element={<SavedScreenerPage />} />
            <Route path="/scanner/history" element={<ScannerHistoryPage />} />
            <Route path={ROUTES.ALERTS} element={<AlertsPage />} />
            <Route path="/alerts/create" element={<AlertBuilderPage />} />
            <Route path="/alerts/history" element={<AlertHistoryPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/notification-settings" element={<NotificationSettingsPage />} />
            <Route path={ROUTES.ADMIN} element={<AdminPage />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/admin/roles" element={<AdminRolesPage />} />
            <Route path="/admin/subscriptions" element={<AdminSubscriptionsPage />} />
            <Route path="/admin/providers" element={<AdminProvidersPage />} />
            <Route path="/admin/system-health" element={<AdminSystemHealthPage />} />
            <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
            <Route path="/admin/ai" element={<AdminAIOpsPage />} />
            <Route path="/admin/logs" element={<AdminLogsPage />} />
            <Route path="/admin/settings" element={<AdminSettingsPage />} />
            <Route path="/ml" element={<MLPage />} />
            <Route path="/ml/registry" element={<ModelRegistryPage />} />
            <Route path="/ml/train" element={<TrainingPipelinePage />} />
            <Route path="/ml/predict" element={<InferencePage />} />
            <Route path="/ml/metrics" element={<MetricsPage />} />
            <Route path="/paper-trading" element={<PaperTradingPage />} />
            <Route path="/paper-trading/portfolio" element={<PaperPortfolioPage />} />
            <Route path="/paper-trading/orders" element={<PaperOrdersPage />} />
            <Route path="/paper-trading/history" element={<PaperHistoryPage />} />
            <Route path="/paper-trading/leaderboard" element={<PaperLeaderboardPage />} />
            <Route path="/strategy" element={<StrategyPage />} />
            <Route path="/strategy/builder" element={<StrategyBuilderPage />} />
            <Route path="/strategy/backtest" element={<BacktestDashboardPage />} />
            <Route path="/strategy/history" element={<StrategyHistoryPage />} />
            <Route path="/strategy/reports" element={<StrategyReportsPage />} />
            <Route path="/broker-sync" element={<BrokerPage />} />
            <Route path="/broker-sync/accounts" element={<BrokerAccountsPage />} />
            <Route path="/broker-sync/terminal" element={<BrokerTerminalPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/billing" element={<BillingDashboardView />} />
            <Route path="/billing/history" element={<BillingHistoryPage />} />
            <Route path="/billing/invoices" element={<BillingInvoicesPage />} />
            <Route path="/subscription" element={<SubscriptionPage />} />
            <Route path="/subscription/manage" element={<SubscriptionManagePage />} />
            <Route path={ROUTES.CHAT} element={<ChatPage />} />
            <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
          </Route>
        </Route>

        {/* Fallback 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
