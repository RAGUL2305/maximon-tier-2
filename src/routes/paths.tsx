import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Dashboard from "../Dashboard";
import PlatformDashboard from "../PlatformDashboard";
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
        </Route>
      </Routes>
    </Router>
  );
};

export default Paths;
