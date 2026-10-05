

import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";


export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) {
  const [selectedFile, setSelectedFile] = useState(null);

  const [previewSource, setPreviewSource] = useState(
    viewData || editData || ""
  );

  // Register field
  useEffect(() => {
    register(name, { required: true });
  }, [register, name]);

  // Update react-hook-form value
  useEffect(() => {
    setValue(name, selectedFile, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [selectedFile, name, setValue]);

  // Preview file
  const previewFile = (file) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  // Drop handler
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    if (!file) return;

    setSelectedFile(file);
    previewFile(file);
  };

  // Dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: video
      ? {
          "video/*": [".mp4"],
        }
      : {
          "image/*": [".jpg", ".jpeg", ".png"],
        },
    multiple: false,
    onDrop,
  });
// console.log("previewSource:", previewSource);
// console.log("viewData:", viewData);
// console.log("editData:", editData);
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={name} className="text-sm text-richblack-5">
        {label}
        {!viewData && <sup className="text-pink-200">*</sup>}
      </label>

      <div
        {...getRootProps()}
        className={`${
          isDragActive ? "bg-richblack-600" : "bg-richblack-700"
        } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-richblack-500`}
      >
        <input {...getInputProps()} />

        {previewSource ? (
          <div className="flex w-full flex-col p-6">
            {!video ? (
              <img
                src={previewSource}
                alt="Preview"
                className="h-full w-full rounded-md object-cover"
              />
            ) : (
              <div className="aspect-video w-full overflow-hidden rounded-md">
                {/* <ReactPlayer
                  url={previewSource} // Use src if you're on react-player v3
                  controls
                  width="100%"
                  height="100%"
                /> */}

                <video
                    controls
                    width="100%"
                    className="rounded-md"
                  >
                    <source src={previewSource} type="video/mp4" />
                    Your browser does not support the video tag.
                    </video>
              </div>
            )}

            {!viewData && (
              <button
                type="button"
                onClick={() => {
                  setPreviewSource("");
                  setSelectedFile(null);
                  setValue(name, null);
                }}
                className="mt-3 text-richblack-400 underline"
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center p-6">
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-richblack-800">
              <FiUploadCloud className="text-2xl text-yellow-50" />
            </div>

            <p className="mt-2 max-w-[220px] text-center text-sm text-richblack-200">
              Drag & Drop an {!video ? "Image" : "Video"}, or{" "}
              <span className="font-semibold text-yellow-50">
                Browse
              </span>
            </p>

            <ul className="mt-8 flex list-disc gap-8 text-xs text-richblack-200">
              <li>Aspect Ratio 16:9</li>
              <li>1024 × 576 Recommended</li>
            </ul>
          </div>
        )}
      </div>

      {errors[name] && (
        <span className="ml-2 text-xs text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  );
}