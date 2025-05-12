import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Dashboard from "../Dashboard";
import PlatformDashboard from "../PlatformDashboard";
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
import EntityRecognitionConfig from "../Signal Scope/entity-recognition-config";
import DriftInsightDashboard from "../Signal Scope/drift-insight-dashboard";
import SignalScope from "../Signal Scope/signalscope-dashboard";
import EscalationLayer from "../Signal Scope/escalation-layer";
import InsightRouter from "../Signal Scope/insight-router";
import MemoryLookupConsole from "../Signal Scope/memory-lookup-console";
import SignalIntakeList from "../Signal Scope/signal-intake-list";
import SignalScoringEngine from "../Signal Scope/signal-scoring-engine";

const Paths = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<PlatformDashboard />}>
          <Route index element={<Dashboard />} />
          <Route path="core/signal-core" element={<SignalCore />} />
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
          <Route path="memorydrawer" element={<MemoryDrawer />} />
          <Route path="memoryloomdashboard" element={<MemoryLoomDashboard />} />
          <Route path="memoryobjectdetails" element={<MemoryObjectDetail />} />
          <Route path="memoryobjectlist" element={<MemoryObjectList />} />
          <Route path="searchconsole" element={<MemorySearchConsole />} />
          <Route path="messageautomizer" element={<MessageAtomizer />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Paths;
