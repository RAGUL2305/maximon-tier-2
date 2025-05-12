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

const Paths = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<PlatformDashboard />}>
          <Route index element={<Dashboard />} />
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
          <Route path="brandlexicon" element={<BrandLexiconView/>} />
          <Route path="codex" element={<CodexUploadPage/>} />
          <Route path="driftscanner" element={<DriftScannerView/>} /> 
          <Route path="memorydrawer" element={<MemoryDrawer/>} />
          <Route path="memoryloomdashboard" element={<MemoryLoomDashboard/>} /> 
          <Route path="memoryobjectdetails" element={<MemoryObjectDetail/>} />
          <Route path="memoryobjectlist" element={<MemoryObjectList/>} />
          <Route path="searchconsole" element={<MemorySearchConsole/>} />
          <Route path="messageautomizer" element={<MessageAtomizer/>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Paths;
