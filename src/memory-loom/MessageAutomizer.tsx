import { useState } from "react";
import {
  Layers,
  Scissors,
  RefreshCw,
  AlertTriangle,
  Check,
} from "lucide-react";

const MessageAtomizer = () => {
  const [files, setFiles] = useState([
    {
      id: 1,
      name: "brand_guidelines_2025.pdf",
      size: "2.4 MB",
      processed: false,
      status: "ready",
    },
    {
      id: 2,
      name: "product_messaging.docx",
      size: "1.1 MB",
      processed: false,
      status: "ready",
    },
    {
      id: 3,
      name: "corporate_voice_guide.pdf",
      size: "3.7 MB",
      processed: false,
      status: "ready",
    },
    {
      id: 4,
      name: "customer_segments.pdf",
      size: "8.5 MB",
      processed: false,
      status: "ready",
    },
    {
      id: 5,
      name: "marketing_comms.docx",
      size: "1.8 MB",
      processed: false,
      status: "ready",
    },
  ]);

  const [atomizedUnits, setAtomizedUnits] = useState<
    { id: string; content: string; length: number; status: string }[]
  >([]);
  const [selectedUnits, setSelectedUnits] = useState<string[]>([]);
  const [processing, setProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleAtomize = (id: number) => {
    setProcessing(true);
    setErrorMsg("");

    // Simulate processing delay
    setTimeout(() => {
      // Check for file size limit for demonstration purposes
      const file = files.find((f) => f.id === id);
      if (!file || file.size === "8.5 MB") {
        setErrorMsg(
          file
            ? `Cannot atomize "${file.name}" - exceeds 20MB size limit`
            : "Cannot atomize - file not found"
        );
        setProcessing(false);
        return;
      }

      // Update file status
      const updatedFiles = files.map((file) =>
        file.id === id ? { ...file, processed: true, status: "atomized" } : file
      );
      setFiles(updatedFiles);

      // Generate atomized units based on file
      const units = generateAtomizedUnits(file.name);
      setAtomizedUnits([...atomizedUnits, ...units]);
      setProcessing(false);
    }, 1500);
  };

  const generateAtomizedUnits = (fileName: string | string[]) => {
    // Mock data generation based on file name
    const baseUnits = [
      {
        id: Math.random().toString(36).substr(2, 9),
        content: "Our commitment to sustainability is unwavering.",
        length: 52,
        status: "active",
      },
      {
        id: Math.random().toString(36).substr(2, 9),
        content: "Innovation drives everything we do.",
        length: 36,
        status: "active",
      },
      {
        id: Math.random().toString(36).substr(2, 9),
        content: "Customer satisfaction is our top priority.",
        length: 43,
        status: "active",
      },
    ];

    if (fileName.includes("brand")) {
      return [
        ...baseUnits,
        {
          id: Math.random().toString(36).substr(2, 9),
          content:
            "Our brand stands for quality, reliability and forward-thinking.",
          length: 62,
          status: "active",
        },
        {
          id: Math.random().toString(36).substr(2, 9),
          content:
            "We believe in creating products that enhance human potential.",
          length: 59,
          status: "active",
        },
      ];
    } else if (fileName.includes("product")) {
      return [
        ...baseUnits,
        {
          id: Math.random().toString(36).substr(2, 9),
          content: "Our products are designed with the user in mind.",
          length: 48,
          status: "active",
        },
        {
          id: Math.random().toString(36).substr(2, 9),
          content:
            "We leverage cutting-edge technology to solve real problems.",
          length: 58,
          status: "active",
        },
      ];
    } else {
      return baseUnits;
    }
  };

  const toggleUnitSelection = (id: string) => {
    if (selectedUnits.includes(id)) {
      setSelectedUnits(selectedUnits.filter((unitId) => unitId !== id));
    } else {
      setSelectedUnits([...selectedUnits, id]);
    }
  };

  const recombineSelectedUnits = () => {
    if (selectedUnits.length < 2) return;

    const newUnit = {
      id: Math.random().toString(36).substr(2, 9),
      content: selectedUnits
        .map(
          (id) => atomizedUnits.find((unit) => unit.id === id)?.content ?? ""
        )
        .join(" "),
      length: selectedUnits.reduce(
        (total, id) =>
          total +
          (atomizedUnits.find((unit) => unit.id === id)?.content.length || 0),
        0
      ),
      status: "active",
    };

    // Remove selected units and add combined unit
    setAtomizedUnits([
      ...atomizedUnits.filter((unit) => !selectedUnits.includes(unit.id)),
      newUnit,
    ]);

    setSelectedUnits([]);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 p-6 rounded-lg shadow">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Message Atomizer
        </h2>
        <p className="text-gray-600">
          Break content into reusable semantic units for brand memory
        </p>
      </div>

      {errorMsg && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded flex items-center">
          <AlertTriangle className="mr-2" size={20} />
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* File List Panel */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center mb-4">
            <Layers className="mr-2 text-blue-600" />
            <h3 className="text-lg font-semibold">Source Files</h3>
          </div>

          <div className="overflow-y-auto max-h-96">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-3 border-b border-gray-100 hover:bg-gray-50"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{file.name}</p>
                  <p className="text-sm text-gray-500">{file.size}</p>
                </div>
                <div className="flex items-center">
                  {file.processed ? (
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full flex items-center">
                      <Check size={12} className="mr-1" />
                      Atomized
                    </span>
                  ) : (
                    <button
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center text-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
                      onClick={() => handleAtomize(file.id)}
                      disabled={processing}
                    >
                      <Scissors size={14} className="mr-1" />
                      Atomize
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Atomized Units Panel */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Scissors className="mr-2 text-blue-600" />
              <h3 className="text-lg font-semibold">Atomized Units</h3>
            </div>

            <button
              className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded flex items-center text-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
              onClick={recombineSelectedUnits}
              disabled={selectedUnits.length < 2}
            >
              <RefreshCw size={14} className="mr-1" />
              Recombine Selected
            </button>
          </div>

          {processing ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            </div>
          ) : atomizedUnits.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <p>No atomized units yet. Select a file to atomize.</p>
            </div>
          ) : (
            <div className="overflow-y-auto max-h-96">
              {atomizedUnits.map((unit) => (
                <div
                  key={unit.id}
                  className={`p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                    selectedUnits.includes(unit.id)
                      ? "bg-blue-50 border-l-4 border-l-blue-500"
                      : ""
                  }`}
                  onClick={() => toggleUnitSelection(unit.id)}
                >
                  <p className="text-gray-800 mb-1">{unit.content}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span className="mr-2">Length: {unit.length}</span>
                    <span className="px-2 py-1 bg-gray-100 rounded-full">
                      ID: {unit.id.substring(0, 5)}...
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 text-sm text-gray-500">
        <p>
          Note: Files exceeding 20MB cannot be atomized. All atomized content
          automatically adheres to brand governance rules.
        </p>
      </div>
    </div>
  );
};

export default MessageAtomizer;
