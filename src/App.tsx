import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/screens/HomeScreen';
import { CategoryScreen } from './components/screens/CategoryScreen';
import { DiscoverScreen } from './components/screens/DiscoverScreen';
import { CartScreen } from './components/screens/CartScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { ProductDetailScreen } from './components/screens/ProductDetailScreen';
import { Toast } from './components/modals/Toast';
import { SearchModal } from './components/modals/SearchModal';
import { ChatModal } from './components/modals/ChatModal';
import { BundleDrawer } from './components/modals/BundleDrawer';

const AppContent: React.FC = () => {
  const { activeTab, selectedProduct } = useApp();

  return (
    <div className="w-full min-h-screen bg-[#f8f9ff] text-[#121c2a] flex justify-center">
      <div className="w-full max-w-md min-h-screen bg-[#f8f9ff] relative shadow-2xl flex flex-col overflow-x-hidden">
        {/* Fixed Top Header (hidden when product detail is active) */}
        <Header />

        {/* Dynamic Screen View */}
        {selectedProduct ? (
          <ProductDetailScreen product={selectedProduct} />
        ) : (
          <main className="flex-1 w-full pt-14 bg-[#f8f9ff]">
            {activeTab === 'home' && <HomeScreen />}
            {activeTab === 'categories' && <CategoryScreen />}
            {activeTab === 'discover' && <DiscoverScreen />}
            {activeTab === 'cart' && <CartScreen />}
            {activeTab === 'profile' && <ProfileScreen />}
          </main>
        )}

        {/* Fixed Bottom Navigation */}
        <BottomNav />

        {/* Global Floating Toast */}
        <Toast />

        {/* Interactive Modals */}
        <SearchModal />
        <ChatModal />
        <BundleDrawer />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
