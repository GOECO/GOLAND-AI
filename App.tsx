
import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import SplashScreen from './pages/SplashScreen';
import Onboarding from './pages/Onboarding';
import LoginScreen from './pages/LoginScreen';
import HomeScreen from './pages/HomeScreen';
import MapScreen from './pages/MapScreen';
import PropertyDetail from './pages/PropertyDetail';
import ChatScreen from './pages/ChatScreen';
import ChatHistory from './pages/ChatHistory';
import ChatCustomization from './pages/ChatCustomization';
import EditChatBackground from './pages/EditChatBackground';
import ProfileScreen from './pages/ProfileScreen';
import SharePreview from './pages/SharePreview';
import ShareSettings from './pages/ShareSettings';
import AdvancedSettings from './pages/AdvancedSettings';
import DataAccessRights from './pages/DataAccessRights';
import LanguageRegionSettings from './pages/LanguageRegionSettings';
import AboutUs from './pages/AboutUs';
import HelpSupport from './pages/HelpSupport';
import MarketReport from './pages/MarketReport';
import SummaryScreen from './pages/SummaryScreen';
import NewsDetail from './pages/NewsDetail';
import AlertSettings from './pages/AlertSettings';
import CreateAlert from './pages/CreateAlert';
import MapSelection from './pages/MapSelection';
import EventDetail from './pages/EventDetail';
import PersonalEvents from './pages/PersonalEvents';
import CreateEvent from './pages/CreateEvent';
import CalendarView from './pages/CalendarView';
import FeedbackScreen from './pages/FeedbackScreen';
import FeedbackSuccessScreen from './pages/FeedbackSuccessScreen';
import SavedProjects from './pages/SavedProjects';
import UserManagement from './pages/UserManagement';
import AddUser from './pages/AddUser';
import ChangeUserRole from './pages/ChangeUserRole';
import InboxScreen from './pages/InboxScreen';
import BottomNav from './components/BottomNav';

const AppContent: React.FC = () => {
  const location = useLocation();
  const showNav = ['/home', '/map', '/saved', '/profile', '/inbox', '/chat-history'].includes(location.pathname);
  // Separate check for management routes which might use a different nav
  const isManagement = ['/user-management', '/add-user', '/change-role'].some(path => location.pathname.startsWith(path));

  return (
    <div className="max-w-[480px] mx-auto bg-background-light dark:bg-background-dark min-h-screen relative shadow-2xl overflow-x-hidden font-body text-slate-900 dark:text-white">
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/map" element={<MapScreen />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/chat" element={<ChatScreen />} />
        <Route path="/chat-history" element={<ChatHistory />} />
        <Route path="/chat-customization" element={<ChatCustomization />} />
        <Route path="/edit-chat-bg" element={<EditChatBackground />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/share-preview" element={<SharePreview />} />
        <Route path="/share-settings" element={<ShareSettings />} />
        <Route path="/advanced-settings" element={<AdvancedSettings />} />
        <Route path="/data-access-rights" element={<DataAccessRights />} />
        <Route path="/language-region" element={<LanguageRegionSettings />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/help" element={<HelpSupport />} />
        <Route path="/market-report" element={<MarketReport />} />
        <Route path="/summary" element={<SummaryScreen />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/alert-settings" element={<AlertSettings />} />
        <Route path="/create-alert" element={<CreateAlert />} />
        <Route path="/map-selection" element={<MapSelection />} />
        <Route path="/personal-events" element={<PersonalEvents />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/edit-event/:id" element={<CreateEvent />} />
        <Route path="/calendar" element={<CalendarView />} />
        <Route path="/feedback" element={<FeedbackScreen />} />
        <Route path="/feedback-success" element={<FeedbackSuccessScreen />} />
        <Route path="/saved" element={<SavedProjects />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/edit-user/:id" element={<AddUser />} />
        <Route path="/change-role/:id" element={<ChangeUserRole />} />
        <Route path="/inbox" element={<InboxScreen />} />
      </Routes>
      {showNav && !isManagement && <BottomNav />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
