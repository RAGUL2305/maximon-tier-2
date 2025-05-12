import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Dashboard from "../Dashboard";
import BrandLexiconView from "../MemoryLoom/BrandLexiconView";
import MemoryLoomDashboard from "../MemoryLoom/MemoryLoomDashBoard";
import MemoryLoomUploadScreen from "../MemoryLoom/MemoryLoomUploadScreen";
import MemoryObjectDetailView from "../MemoryLoom/MemoryObjectDetailView";
import MemoryObjectListView from "../MemoryLoom/MemoryObjectListView";
import MemorySearchConsole from "../MemoryLoom/MemorySearchConsole";
import PlatformDashboard from "../PlatformDashboard";
import InsightRouter from "../SIgnal Scope/insight-router";
import SignalIntakeList from "../SIgnal Scope/signal-intake-list";
import SignalScoringEngine from "../SIgnal Scope/signal-scoring-engine";
import SignalScopeDashboard from "../SIgnal Scope/signalscope-dashboard";
import CreateEditJourneyPage from "../SignalFlow/CreateEditJourneyPage";
import JourneyDetailView from "../SignalFlow/JourneyDetailView";
import SignalFlowDashboard from "../SignalFlow/SignalFlowDashboard";
import SignalMonitorScreen from "../SignalFlow/SignalMonitorScreen";
import Create from "../SignalStudio/Create";
import DraftDetailView from "../SignalStudio/DraftDetailView";
import ExportHub from "../SignalStudio/ExportHub";
import SignalStudioWireframes from "../SignalStudio/SingnalStudioWireFrames";
import MemoryLookupConsole from "../SIgnal Scope/memory-lookup-console";
import SignalDetailView from "../SIgnal Scope/signal-detail-view";
import MemoryObjectDetailViews from "../SIgnal Scope/memory-object-detail-view";
import SignalCoreDashboard from "../SignalCore/SignalCoreDashboard";
import SignalIntakeConsole from "../SignalCore/SignalIntakeConsole";
import CoreExportHub from "../SignalCore/ExportHub";
import DecisionEngineDashboard from "../SignalCore/DesignEngineDashboard";
import GrowthSignalMapper from "../SignalCore/GrowthSignalMapper";
import DeveloperSDKLanding from "../DeveloperSDK/DeveloperSDKLanding";
import ApiDocumentationPage from "../DeveloperSDK/ApiDocumentationPage";
import CreateTokenModalDemo from "../DeveloperSDK/CreateTokenModel";
import ApiTokensPage from "../DeveloperSDK/ApiTokensPage";
import ApiErrorLogPage from "../DeveloperSDK/ApiErrorLogPage";

const Paths = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<PlatformDashboard />}>
          <Route index element={<Dashboard />} />
          <Route path="signal-studio" element={<SignalStudioWireframes />} />
          <Route path="signal-studio/create" element={<Create />} />
          <Route path="signal-studio/draft" element={<DraftDetailView />} />
          <Route path="signal-studio/export" element={<ExportHub />} />
          <Route path="memory-loom" element={<MemoryLoomDashboard />} />
          <Route
            path="memory-loom/upload"
            element={<MemoryLoomUploadScreen />}
          />
          <Route
            path="memory-loom/list-view"
            element={<MemoryObjectListView />}
          />
          <Route
            path="memory-loom/detailview"
            element={<MemoryObjectDetailView />}
          />
          <Route path="memory-loom/search" element={<MemorySearchConsole />} />
          <Route path="memory-bloom/lexicon" element={<BrandLexiconView />} />
          <Route path="signal-flow" element={<SignalFlowDashboard />} />
          <Route
            path="signal-flow/detail-view"
            element={<JourneyDetailView />}
          />
          <Route
            path="signal-flow/signal-monitor"
            element={<SignalMonitorScreen />}
          />
          <Route
            path="signal-flow/create"
            element={<CreateEditJourneyPage />}
          />
          <Route path="signal-scope" element={<SignalScopeDashboard />} />
          <Route path="signal-scope/intake" element={<SignalIntakeList />} />
          <Route
            path="signal-scope/scoring-engine"
            element={<SignalScoringEngine />}
          />
          <Route
            path="signal-scope/insight-router"
            element={<InsightRouter />}
          />
          <Route
            path="signal-scope/memory-lookup"
            element={<MemoryLookupConsole />}
          />
          <Route
            path="signal-scope/memory-lookup/detail"
            element={<MemoryObjectDetailViews />}
          />
          <Route
            path="signal-scope/insight-router/detail"
            element={<SignalDetailView />}
          />
          <Route path="signal-core" element={<SignalCoreDashboard />} />
          <Route path="signal-core/intake" element={<SignalIntakeConsole />} />
          <Route path="signal-core/export-hub" element={<CoreExportHub />} />
          <Route
            path="signal-core/design-engine"
            element={<DecisionEngineDashboard />}
          />
          <Route
            path="signal-core/growth-signal"
            element={<GrowthSignalMapper />}
          />
          <Route path="developer-sdk" element={<DeveloperSDKLanding />} />
          <Route
            path="developer-sdk/api-docs"
            element={<ApiDocumentationPage />}
          />
          <Route
            path="developer-sdk/create-token"
            element={<CreateTokenModalDemo />}
          />
          <Route path="developer-sdk/api-tokens" element={<ApiTokensPage />} />
          <Route
            path="developer-sdk/api-error-log"
            element={<ApiErrorLogPage />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default Paths;
