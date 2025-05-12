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
        </Route>
      </Routes>
    </Router>
  );
};

export default Paths;
