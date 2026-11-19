import { HashRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { StoreProvider } from "./state/store";
import { TourProvider } from "./components/Tour";
import { Toasts } from "./components/ui";
import Hub from "./pages/Hub";
import Brand from "./pages/Brand";
import { SiteLayout } from "./pages/site/SiteLayout";
import SiteHome from "./pages/site/Home";
import Service from "./pages/site/Service";
import Who from "./pages/site/Who";
import Gallery from "./pages/site/Gallery";
import Colours from "./pages/site/Colours";
import QuotePage from "./pages/site/Quote";
import { About, Contact } from "./pages/site/Other";
import { CmsLayout } from "./pages/cms/CmsLayout";
import CmsLogin from "./pages/cms/Login";
import CmsDashboard from "./pages/cms/Dashboard";
import Enquiries from "./pages/cms/Enquiries";
import Content from "./pages/cms/Content";
import { WsLayout } from "./pages/ws/WsLayout";
import Today from "./pages/ws/Today";
import Jobs from "./pages/ws/Jobs";
import Batching from "./pages/ws/Batching";
import Quotes, { QuoteBuilder } from "./pages/ws/Quotes";
import Customers from "./pages/ws/Customers";
import Invoices from "./pages/ws/Invoices";
import Reports from "./pages/ws/Reports";
import Floor from "./pages/ws/Floor";
import WsSettings from "./pages/ws/Settings";

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <StoreProvider>
      <HashRouter>
        <TourProvider>
          <ScrollTop />
          <Routes>
            <Route path="/" element={<Hub />} />
            <Route path="/brand" element={<Brand />} />
            <Route path="/site" element={<SiteLayout />}>
              <Route index element={<SiteHome />} />
              <Route path="powder-coating" element={<Service />} />
              <Route path="who/:seg" element={<Who />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="colours" element={<Colours />} />
              <Route path="quote" element={<QuotePage />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
            </Route>
            <Route path="/cms" element={<CmsLogin />} />
            <Route element={<CmsLayout />}>
              <Route path="/cms/dashboard" element={<CmsDashboard />} />
              <Route path="/cms/enquiries" element={<Enquiries />} />
              <Route path="/cms/content" element={<Content />} />
            </Route>
            <Route path="/ws" element={<WsLayout />}>
              <Route index element={<Today />} />
              <Route path="jobs" element={<Jobs />} />
              <Route path="batching" element={<Batching />} />
              <Route path="quotes" element={<Quotes />} />
              <Route path="quotes/:id" element={<QuoteBuilder />} />
              <Route path="customers" element={<Customers />} />
              <Route path="invoices" element={<Invoices />} />
              <Route path="reports" element={<Reports />} />
              <Route path="floor" element={<Floor />} />
              <Route path="settings" element={<WsSettings />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toasts />
        </TourProvider>
      </HashRouter>
    </StoreProvider>
  );
}
