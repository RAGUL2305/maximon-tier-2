import React, { useState } from "react";
import {
  Terminal,
  Copy,
  CheckCircle,
  AlertTriangle,
  Info,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const CLIAccessConfig = () => {
  const [token, setToken] = useState("mkt_os_cli_62f79adb3ae5510b");
  const [copied, setCopied] = useState(false);
  const [expandedOS, setExpandedOS] = useState("mac");
  const [tokenGenerated, setTokenGenerated] = useState(true);

  const handleCopy = () => {
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateToken = () => {
    // In a real implementation, this would call an API to generate a token
    setToken("mkt_os_cli_" + Math.random().toString(16).slice(2, 14));
    setTokenGenerated(true);
  };

  const toggleExpand = (os) => {
    if (expandedOS === os) {
      setExpandedOS(null);
    } else {
      setExpandedOS(os);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200 bg-gray-100 px-6 py-4 rounded-t-lg flex items-center">
          <Terminal className="text-blue-600 mr-2" size={20} />
          <h1 className="text-xl font-semibold text-gray-800">
            CLI Access Configuration
          </h1>
        </div>

        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4 text-gray-700">
              CLI Token
            </h2>
            <p className="text-gray-600 mb-4">
              This token is required to authenticate CLI operations with your
              Marketing OS account. Keep it secure and don't share it.
            </p>

            <div className="flex items-center mb-4">
              <div className="relative flex-grow">
                <input
                  type="text"
                  value={token}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 font-mono"
                />
                {tokenGenerated && (
                  <div className="absolute right-2 top-2.5 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                    Active
                  </div>
                )}
              </div>
              <button
                onClick={handleCopy}
                className="ml-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md flex items-center"
              >
                {copied ? (
                  <CheckCircle size={18} className="text-green-600" />
                ) : (
                  <Copy size={18} />
                )}
                <span className="ml-1">{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={handleGenerateToken}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                Generate New Token
              </button>
              <button className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-md border border-red-200">
                Revoke Token
              </button>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex items-start">
                <AlertTriangle
                  className="text-yellow-500 mt-0.5 mr-2"
                  size={18}
                />
                <p className="text-yellow-700 text-sm">
                  Generating a new token will invalidate any existing token.
                  Connected CLI tools will need to be reconfigured.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4 text-gray-700">
              Installation Instructions
            </h2>

            <div className="border border-gray-200 rounded-md mb-4">
              {/* Mac OS Instructions */}
              <div className="border-b border-gray-200 last:border-b-0">
                <button
                  className="w-full px-4 py-3 flex justify-between items-center hover:bg-gray-50 text-left"
                  onClick={() => toggleExpand("mac")}
                >
                  <span className="font-medium">macOS Installation</span>
                  {expandedOS === "mac" ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </button>
                {expandedOS === "mac" && (
                  <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                    <ol className="list-decimal ml-4 space-y-2 text-gray-700">
                      <li>Open Terminal</li>
                      <li>
                        Install with Homebrew:
                        <div className="bg-gray-800 text-gray-200 p-2 rounded mt-1 font-mono text-sm overflow-x-auto">
                          brew install marketing-os-cli
                        </div>
                      </li>
                      <li>
                        Configure with your token:
                        <div className="bg-gray-800 text-gray-200 p-2 rounded mt-1 font-mono text-sm overflow-x-auto">
                          mkt-os config --token={token}
                        </div>
                      </li>
                      <li>
                        Verify installation:
                        <div className="bg-gray-800 text-gray-200 p-2 rounded mt-1 font-mono text-sm overflow-x-auto">
                          mkt-os --version
                        </div>
                      </li>
                    </ol>
                  </div>
                )}
              </div>

              {/* Windows Instructions */}
              <div className="border-b border-gray-200 last:border-b-0">
                <button
                  className="w-full px-4 py-3 flex justify-between items-center hover:bg-gray-50 text-left"
                  onClick={() => toggleExpand("windows")}
                >
                  <span className="font-medium">Windows Installation</span>
                  {expandedOS === "windows" ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </button>
                {expandedOS === "windows" && (
                  <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                    <ol className="list-decimal ml-4 space-y-2 text-gray-700">
                      <li>
                        Download the installer from the download section below
                      </li>
                      <li>Run the installer as administrator</li>
                      <li>Open Command Prompt or PowerShell</li>
                      <li>
                        Configure with your token:
                        <div className="bg-gray-800 text-gray-200 p-2 rounded mt-1 font-mono text-sm overflow-x-auto">
                          mkt-os config --token={token}
                        </div>
                      </li>
                      <li>
                        Verify installation:
                        <div className="bg-gray-800 text-gray-200 p-2 rounded mt-1 font-mono text-sm overflow-x-auto">
                          mkt-os --version
                        </div>
                      </li>
                    </ol>
                  </div>
                )}
              </div>

              {/* Linux Instructions */}
              <div>
                <button
                  className="w-full px-4 py-3 flex justify-between items-center hover:bg-gray-50 text-left"
                  onClick={() => toggleExpand("linux")}
                >
                  <span className="font-medium">Linux Installation</span>
                  {expandedOS === "linux" ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </button>
                {expandedOS === "linux" && (
                  <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                    <ol className="list-decimal ml-4 space-y-2 text-gray-700">
                      <li>Open Terminal</li>
                      <li>
                        Download and install:
                        <div className="bg-gray-800 text-gray-200 p-2 rounded mt-1 font-mono text-sm overflow-x-auto">
                          curl -sSL https://get.marketing-os.ai | sudo bash
                        </div>
                      </li>
                      <li>
                        Configure with your token:
                        <div className="bg-gray-800 text-gray-200 p-2 rounded mt-1 font-mono text-sm overflow-x-auto">
                          mkt-os config --token={token}
                        </div>
                      </li>
                      <li>
                        Verify installation:
                        <div className="bg-gray-800 text-gray-200 p-2 rounded mt-1 font-mono text-sm overflow-x-auto">
                          mkt-os --version
                        </div>
                      </li>
                    </ol>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4 text-gray-700">
              Download CLI Tool
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <a
                href="#"
                className="border border-gray-200 rounded-md p-4 hover:bg-gray-50 flex flex-col items-center text-center"
              >
                <img
                  src="/api/placeholder/64/64"
                  alt="macOS logo"
                  className="mb-2"
                />
                <span className="font-medium mb-1">macOS</span>
                <span className="text-sm text-gray-500">
                  v1.2.3 (Intel/Apple Silicon)
                </span>
              </a>
              <a
                href="#"
                className="border border-gray-200 rounded-md p-4 hover:bg-gray-50 flex flex-col items-center text-center"
              >
                <img
                  src="/api/placeholder/64/64"
                  alt="Windows logo"
                  className="mb-2"
                />
                <span className="font-medium mb-1">Windows</span>
                <span className="text-sm text-gray-500">v1.2.3 (x64)</span>
              </a>
              <a
                href="#"
                className="border border-gray-200 rounded-md p-4 hover:bg-gray-50 flex flex-col items-center text-center"
              >
                <img
                  src="/api/placeholder/64/64"
                  alt="Linux logo"
                  className="mb-2"
                />
                <span className="font-medium mb-1">Linux</span>
                <span className="text-sm text-gray-500">v1.2.3 (x64)</span>
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-medium mb-4 text-gray-700">
              CLI Quick Reference
            </h2>
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Command
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-gray-700">
                      mkt-os --help
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      Show command help
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-gray-700">
                      mkt-os status
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      Check connection status
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-gray-700">
                      mkt-os sync
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      Sync local changes with Marketing OS
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-gray-700">
                      mkt-os deploy
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      Deploy configuration changes
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-gray-700">
                      mkt-os export
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      Export content or configuration
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex items-start">
              <Info
                className="text-blue-500 mt-0.5 mr-2 flex-shrink-0"
                size={18}
              />
              <p className="text-sm text-gray-600">
                For complete documentation, run{" "}
                <code className="bg-gray-100 px-1 py-0.5 rounded">
                  mkt-os docs
                </code>{" "}
                to open the local documentation or visit the{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  online documentation
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CLIAccessConfig;
