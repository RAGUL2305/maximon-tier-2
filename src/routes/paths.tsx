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
import ApiDocumentationViewer from "../development-sdk/ApiDocsViewer";
import APIErrorLog from "../development-sdk/ApiErrorLog";
import APITokensPage from "../development-sdk/ApiTokensPage";
import CLIAccessConfig from "../development-sdk/CliAccessConfig";
import SDKLandingPage from "../development-sdk/SdkLandingPage";
import WebhooksConfig from "../development-sdk/WebHooksConfig";
import EntityRecognitionConfig from "../Signal Scope/entity-recognition-config";
import DriftInsightDashboard from "../Signal Scope/drift-insight-dashboard";
import SignalScope from "../Signal Scope/signalscope-dashboard";
import EscalationLayer from "../Signal Scope/escalation-layer";
import InsightRouter from "../Signal Scope/insight-router";
import MemoryLookupConsole from "../Signal Scope/memory-lookup-console";
import SignalIntakeList from "../Signal Scope/signal-intake-list";
import SignalScoringEngine from "../Signal Scope/signal-scoring-engine";
import FallbackEscalationManager from "../signal-flow/FallbackEscalation";
import JourneyAnalyticsDashboard from "../signal-flow/JourneyAnalyticsDashboard";
import JourneyBuilder from "../signal-flow/JourneyBuilder";
import JourneyDetailView from "../signal-flow/JourneyDetail";
import JourneyListView from "../signal-flow/JourneyListView";
import JourneyValidator from "../signal-flow/JourneyValidator";
import PersonalChannelMap from "../signal-flow/PersonalChannelMap";
import SignalFlowDashboard from "../signal-flow/SignalFlowDashboard";
import SignalMonitor from "../signal-flow/SignalMonitorDashboard";
import EscalationManager from "../admin-tools/EscalationManager";
import GovernanceGuardrailConfig from "../admin-tools/GovernanceGuardDrail";
import MemorySyncPanel from "../admin-tools/MemorySyncPanel";
import NotificationsPanel from "../admin-tools/NotificationPannel";
import RolePermissionSystem from "../admin-tools/RolePermissions";
import TrustScoreOverlay from "../admin-tools/TrustScoreOverlay";
import VersionHistoryAuditLogs from "../admin-tools/VersionHistory";
import TriggerConfigurator from "../signal-flow/TriggerConfig";

const Paths = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<PlatformDashboard />}>
          <Route index element={<Dashboard />} />
          <Route path="core/signal-core" element={<SignalCore />} />
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
            path="core/decision-engine-dashboard"
            element={<DecisionEngineDashboard />}
          />
          <Route
            path="core/growth-signal-mapper"
            element={<GrowthSignalMapper />}
          />
          <Route
            path="core/performance-analytics-dashboard"
            element={<PerformanceAnalyticsDashboard />}
          />
          <Route
            path="core/persona-trigger-matrix"
            element={<PersonaTriggerMatrix />}
          />
          <Route
            path="core/signal-core-exportHub"
            element={<SignalCoreExportHub />}
          />
          <Route
            path="core/signal-intake-console"
            element={<SignalIntakeConsole />}
          />
          <Route path="core/simulation-studio" element={<SimulationStudio />} />

          <Route path="scope/signal-scope" element={<SignalScope />} />
          <Route
            path="scope/drift-insight-dashboard"
            element={<DriftInsightDashboard />}
          />
          <Route
            path="scope/entity-recognition-config"
            element={<EntityRecognitionConfig />}
          />
          <Route path="scope/escalation-layer" element={<EscalationLayer />} />
          <Route path="scope/insight-router" element={<InsightRouter />} />
          <Route
            path="scope/memory-lookup-console"
            element={<MemoryLookupConsole />}
          />
          <Route
            path="scope/signal-intake-list"
            element={<SignalIntakeList />}
          />
          <Route
            path="scope/signal-scoring-engine"
            element={<SignalScoringEngine />}
          />

          <Route path="audittrails" element={<AuditTrailLog />} />
          <Route path="brandlexicon" element={<BrandLexiconView />} />
          <Route path="codex" element={<CodexUploadPage />} />
          <Route path="driftscanner" element={<DriftScannerView />} />
          <Route path="memoryloomdashboard" element={<MemoryLoomDashboard />} />
          <Route path="memoryobjectdetails" element={<MemoryObjectDetail />} />
          <Route path="memoryobjectlist" element={<MemoryObjectList />} />
          <Route path="searchconsole" element={<MemorySearchConsole />} />
          <Route path="messageautomizer" element={<MessageAtomizer />} />

          <Route path="sdk/apidocs" element={<ApiDocumentationViewer />} />
          <Route path="sdk/apierror" element={<APIErrorLog />} />
          <Route path="sdk/apitokens" element={<APITokensPage />} />
          <Route path="sdk/cliaccess" element={<CLIAccessConfig />} />
          <Route path="sdk/landing" element={<SDKLandingPage />} />
          <Route path="sdk/webhooks" element={<WebhooksConfig />} />
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
          <Route path="personachannel" element={<PersonalChannelMap />} />
          <Route path="signalflow" element={<SignalFlowDashboard />} />
          <Route path="signalmonitor" element={<SignalMonitor />} />
          <Route path="triggerconfigurator" element={<TriggerConfigurator />} />

          {/* Admin tools */}

          <Route path="escalation" element={<EscalationManager />} />
          <Route path="governance" element={< GovernanceGuardrailConfig/>} />
          <Route path="memorysync" element={<MemorySyncPanel />} />
          <Route path="notification" element={<NotificationsPanel />} />
          <Route path="rolepermission" element={< RolePermissionSystem/>} />
          <Route path="trustscoreoverlay" element={< TrustScoreOverlay/>} />  
          <Route path="versionhistory" element={< VersionHistoryAuditLogs/>} />
          
        </Route>
      </Routes>
    </Router>
  );
};

export default Paths;
