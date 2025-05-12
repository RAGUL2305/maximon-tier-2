import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Dashboard from "../Dashboard";
import PlatformDashboard from "../PlatformDashboard";
import SignalStudioDashboard from "../signal-studio/SignalStudioDashboard";
import CreateEditDraftPage from "../signal-studio/CreateEditDraftPage";
import VisualAssetStudio from "../signal-studio/VisualAssestStudio";
import SnippetManager from "../signal-studio/SnippetManager";
import PromptLibrary from "../signal-studio/PromptLibrary";
import ExportHub from "../signal-studio/ExprotHub";
import BrandVoiceGovernanceConfig from "../signal-studio/BrandVoiceGovernence";
import DriftDashboard from "../signal-studio/DriftDashBoard";
import DraftDetailView from "../signal-studio/DraftDeatilsView";
import DraftListView from "../signal-studio/DraftListView";
import AuditTrailLog from "../memory-loom/AuditTraIlLog";
import BrandLexiconView from "../memory-loom/BrandLexiconView";
import DriftScannerView from "../memory-loom/DriftScannner";
import MemoryDrawer from "../memory-loom/MemoryDrawer";
import MemoryLoomDashboard from "../memory-loom/MemoryLoomDashboard";
import MemoryObjectDetail from "../memory-loom/MemoryObjectDetails";
import MemoryObjectList from "../memory-loom/MemoryObjectList";
import MemorySearchConsole from "../memory-loom/MemorySearchConsole";
import MessageAtomizer from "../memory-loom/MessageAutomizer";
import CodexUploadPage from "../memory-loom/CodexUploadComputer";
import SignalCore from "../Signal Core/signalcore-dashboard";
import DecisionEngineDashboard from "../Signal Core/decision-engine-dashboard";
import GrowthSignalMapper from "../Signal Core/growth-signal-mapper";
import PerformanceAnalyticsDashboard from "../Signal Core/performance-analytics-dashboard";
import PersonaTriggerMatrix from "../Signal Core/persona-trigger-matrix";
import SignalCoreExportHub from "../Signal Core/signal-core-export-hub";
import SignalIntakeConsole from "../Signal Core/signal-intake-console";
import SimulationStudio from "../Signal Core/simulation-studio";
import FallbackEscalationManager from "../signal-flow/FallbackEscalation";
import JourneyAnalyticsDashboard from "../signal-flow/JourneyAnalyticsDashboard";
import JourneyBuilder from "../signal-flow/JourneyBuilder";
import JourneyDetailView from "../signal-flow/JourneyDetail";
import JourneyListView from "../signal-flow/JourneyListView";
import JourneyValidator from "../signal-flow/JourneyValidator";
import PersonalChannelMap from "../signal-flow/PersonalChannelMap";
import SignalFlowDashboard from "../signal-flow/SignalFlowDashboard";
import SignalMonitor from "../signal-flow/SignalMonitorDashboard";
import TriggerConfigurator from "../signal-flow/PersonalChannelMap";

const Paths = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<PlatformDashboard />}>
          <Route index element={<Dashboard />} />
          <Route path="studio/launcher" element={<SignalStudioDashboard />} />
          <Route path="studio/editor" element={<CreateEditDraftPage />} />
          <Route
            path="studio/visualasseststudio"
            element={<VisualAssetStudio />}
          />
          <Route path="studio/snippet" element={<SnippetManager />} />
          <Route path="studio/prompt" element={<PromptLibrary />} />
          <Route path="studio/exporthub" element={<ExportHub />} />
          <Route
            path="studio/governence"
            element={<BrandVoiceGovernanceConfig />}
          />
          <Route path="studio/drift" element={<DriftDashboard />} />
          <Route path="studio/detailview" element={<DraftDetailView />} />
          <Route path="studio/listview" element={<DraftListView />} />
          <Route path="analytics/SignalCore" element={<SignalCore />} />
          <Route
            path="analytics/DecisionEngineDashboard"
            element={<DecisionEngineDashboard />}
          />
          <Route
            path="analytics/GrowthSignalMapper"
            element={<GrowthSignalMapper />}
          />
          <Route
            path="analytics/PerformanceAnalyticsDashboard"
            element={<PerformanceAnalyticsDashboard />}
          />
          <Route
            path="analytics/PersonaTriggerMatrix"
            element={<PersonaTriggerMatrix />}
          />
          <Route
            path="analytics/SignalCoreExportHub"
            element={<SignalCoreExportHub />}
          />
          <Route
            path="analytics/SignalIntakeConsole"
            element={<SignalIntakeConsole />}
          />
          <Route
            path="analytics/SimulationStudio"
            element={<SimulationStudio />}
          />
          <Route path="audittrails" element={<AuditTrailLog />} />
          <Route path="brandlexicon" element={<BrandLexiconView />} />
          <Route path="codex" element={<CodexUploadPage />} />
          <Route path="driftscanner" element={<DriftScannerView />} />
          <Route path="memorydrawer" element={<MemoryDrawer />} />
          <Route path="memoryloomdashboard" element={<MemoryLoomDashboard />} />
          <Route path="memoryobjectdetails" element={<MemoryObjectDetail />} />
          <Route path="memoryobjectlist" element={<MemoryObjectList />} />
          <Route path="searchconsole" element={<MemorySearchConsole />} />
          <Route path="messageautomizer" element={<MessageAtomizer />} />

          {/* Flow */}

          <Route
            path="fallbackescalation"
            element={<FallbackEscalationManager />}
          />
          <Route
            path="journeyanalytics"
            element={<JourneyAnalyticsDashboard />}
          />
          <Route path="journeybuilder" element={<JourneyBuilder />} />
          <Route path="journeydetail" element={<JourneyDetailView />} />
          <Route path="journeylist" element={<JourneyListView />} />
          <Route path="journeyvalidator" element={<JourneyValidator />} />
          <Route path="personalchannel" element={<PersonalChannelMap />} />
          <Route path="signalflow" element={<SignalFlowDashboard />} />
          <Route path="signalmonitor" element={<SignalMonitor />} />
          <Route path="triggerconfigurator" element={<TriggerConfigurator />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Paths;
