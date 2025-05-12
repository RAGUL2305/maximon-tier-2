import { useState } from "react";
import {
  Camera,
  Image,
  Check,
  X,
  Sliders,
  Upload,
  Download,
  Edit3,
  Layout,
  Layers,
  Grid,
  Palette,
} from "lucide-react";

const VisualAssetStudio = () => {
  const [activeTab, setActiveTab] = useState("gallery");
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [styleSettings, setStyleSettings] = useState({
    tone: "professional",
    colors: "brand",
    style: "modern",
    intensity: 70,
  });

  // Mock data for gallery
  const assetGallery = [
    {
      id: 1,
      name: "Product Hero",
      type: "image",
      status: "approved",
      createdAt: "2025-05-08T14:30:00Z",
    },
    {
      id: 2,
      name: "Team Banner",
      type: "image",
      status: "draft",
      createdAt: "2025-05-07T11:20:00Z",
    },
    {
      id: 3,
      name: "Service Icon Set",
      type: "image",
      status: "approved",
      createdAt: "2025-05-06T09:45:00Z",
    },
    {
      id: 4,
      name: "Homepage Background",
      type: "image",
      status: "pending",
      createdAt: "2025-05-08T08:15:00Z",
    },
    {
      id: 5,
      name: "Social Media Template",
      type: "image",
      status: "draft",
      createdAt: "2025-05-05T16:50:00Z",
    },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const generateNewAsset = () => {
    // In a real implementation, this would trigger AI image generation
    alert(
      "Generating new asset with the following settings:\n" +
        JSON.stringify(styleSettings, null, 2)
    );
  };

  const handleSliderChange = (name, value) => {
    setStyleSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              Visual Asset Studio
            </h1>
            <p className="text-sm text-gray-500">
              Create and manage brand-aligned visual assets
            </p>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Upload className="w-4 h-4 mr-2 inline-block" /> Import
            </button>
            <button
              className="px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700"
              onClick={() => setActiveTab("create")}
            >
              <Camera className="w-4 h-4 mr-2 inline-block" /> New Asset
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-6 px-4">
        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex space-x-8">
            <button
              className={`pb-3 px-1 ${
                activeTab === "gallery"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("gallery")}
            >
              <Grid className="w-4 h-4 mr-2 inline-block" />
              Asset Gallery
            </button>
            <button
              className={`pb-3 px-1 ${
                activeTab === "create"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("create")}
            >
              <Camera className="w-4 h-4 mr-2 inline-block" />
              Create New
            </button>
            <button
              className={`pb-3 px-1 ${
                activeTab === "brandLib"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("brandLib")}
            >
              <Palette className="w-4 h-4 mr-2 inline-block" />
              Brand Library
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === "gallery" && (
          <div>
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-800">
                Asset Gallery
              </h2>
              <div className="flex space-x-2">
                <select className="rounded-md border-gray-300 text-sm">
                  <option>All Types</option>
                  <option>Images</option>
                  <option>Icons</option>
                  <option>Banners</option>
                </select>
                <select className="rounded-md border-gray-300 text-sm">
                  <option>All Status</option>
                  <option>Approved</option>
                  <option>Pending</option>
                  <option>Draft</option>
                </select>
                <input
                  type="text"
                  placeholder="Search assets..."
                  className="rounded-md border-gray-300 text-sm"
                />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {assetGallery.map((asset) => (
                    <tr key={asset.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded flex items-center justify-center">
                            <Image className="h-6 w-6 text-gray-400" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {asset.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {asset.type}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            asset.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : asset.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {asset.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(asset.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          <Edit3 className="w-4 h-4 inline" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          <Download className="w-4 h-4 inline" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <X className="w-4 h-4 inline" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "create" && (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <div className="bg-white p-6 rounded-lg shadow mb-6">
                <h2 className="text-lg font-medium text-gray-800 mb-4">
                  Asset Preview
                </h2>
                <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-12 flex flex-col items-center justify-center h-96">
                  {selectedAsset ? (
                    <div className="text-center">
                      <img
                        src="/api/placeholder/400/320"
                        alt="Generated preview"
                        className="max-h-64 mx-auto mb-4"
                      />
                      <p className="text-sm text-gray-500">
                        Preview of generated asset
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Camera className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">
                        Generate or upload an asset
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Adjust style settings and click generate
                      </p>
                      <div className="mt-6">
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 mr-3"
                        >
                          <Upload className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
                          Upload
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                          onClick={generateNewAsset}
                        >
                          <Camera className="-ml-1 mr-2 h-5 w-5 text-white" />
                          Generate
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-medium text-gray-800 mb-4">
                  Asset Information
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Asset Name
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-md border-gray-300 shadow-sm"
                      placeholder="Enter asset name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Asset Type
                    </label>
                    <select className="w-full rounded-md border-gray-300 shadow-sm">
                      <option>Banner</option>
                      <option>Hero Image</option>
                      <option>Icon</option>
                      <option>Background</option>
                      <option>Product Image</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      className="w-full rounded-md border-gray-300 shadow-sm"
                      placeholder="Enter asset description"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tags
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-md border-gray-300 shadow-sm"
                      placeholder="Enter tags separated by commas"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Dimensions
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        className="w-24 rounded-md border-gray-300 shadow-sm"
                        placeholder="Width"
                      />
                      <span className="flex items-center text-gray-500">×</span>
                      <input
                        type="text"
                        className="w-24 rounded-md border-gray-300 shadow-sm"
                        placeholder="Height"
                      />
                      <select className="rounded-md border-gray-300 shadow-sm">
                        <option>px</option>
                        <option>%</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-1">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-800">
                    Style Controls
                  </h2>
                  <button className="text-sm text-blue-600 hover:text-blue-800">
                    Reset
                  </button>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Visual Tone
                    </label>
                    <select
                      value={styleSettings.tone}
                      onChange={(e) =>
                        handleSliderChange("tone", e.target.value)
                      }
                      className="w-full rounded-md border-gray-300 shadow-sm"
                    >
                      <option value="professional">Professional</option>
                      <option value="friendly">Friendly</option>
                      <option value="creative">Creative</option>
                      <option value="elegant">Elegant</option>
                      <option value="minimal">Minimal</option>
                      <option value="bold">Bold</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Color Scheme
                    </label>
                    <select
                      value={styleSettings.colors}
                      onChange={(e) =>
                        handleSliderChange("colors", e.target.value)
                      }
                      className="w-full rounded-md border-gray-300 shadow-sm"
                    >
                      <option value="brand">Brand Colors</option>
                      <option value="monochrome">Monochrome</option>
                      <option value="vibrant">Vibrant</option>
                      <option value="muted">Muted</option>
                      <option value="warm">Warm</option>
                      <option value="cool">Cool</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Visual Style
                    </label>
                    <select
                      value={styleSettings.style}
                      onChange={(e) =>
                        handleSliderChange("style", e.target.value)
                      }
                      className="w-full rounded-md border-gray-300 shadow-sm"
                    >
                      <option value="modern">Modern</option>
                      <option value="classic">Classic</option>
                      <option value="minimalist">Minimalist</option>
                      <option value="abstract">Abstract</option>
                      <option value="geometric">Geometric</option>
                      <option value="organic">Organic</option>
                    </select>
                  </div>

                  <div>
                    <div className="flex justify-between">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Effect Intensity
                      </label>
                      <span className="text-sm text-gray-500">
                        {styleSettings.intensity}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={styleSettings.intensity}
                      onChange={(e) =>
                        handleSliderChange(
                          "intensity",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full"
                    />
                  </div>

                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      Brand Alignment
                    </h3>
                    <div className="flex items-center justify-between bg-green-50 p-3 rounded-md">
                      <div className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span className="text-sm text-green-700">
                          Brand compliant
                        </span>
                      </div>
                      <span className="text-sm font-medium text-green-700">
                        98%
                      </span>
                    </div>
                  </div>

                  <div className="pt-5">
                    <button
                      className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                      onClick={generateNewAsset}
                    >
                      Generate Asset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "brandLib" && (
          <div>
            <div className="mb-4">
              <h2 className="text-lg font-medium text-gray-800">
                Brand Asset Library
              </h2>
              <p className="text-sm text-gray-500">
                Approved brand visual elements for consistent styling
              </p>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div
                  key={item}
                  className="bg-white rounded-lg shadow overflow-hidden"
                >
                  <div className="h-40 bg-gray-100 flex items-center justify-center">
                    <img
                      src={`/api/placeholder/200/${160 + (item % 3) * 20}`}
                      alt="placeholder"
                      className="max-h-full"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-900">
                      Brand Asset {item}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Company approved
                    </p>
                    <div className="flex justify-end mt-2">
                      <button className="text-xs text-blue-600 hover:text-blue-800">
                        Use
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisualAssetStudio;
