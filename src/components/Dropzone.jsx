import { useState } from "react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FaXmark } from "react-icons/fa6";

const Dropzone = () => {
  const [files, setFiles] = useState([]);
  const [rejectFile, setRejectFile] = useState([])

  console.log(files);

  const onDrop = useCallback((acceptedFiles, reject) => {
    // Do something with the files
    if (acceptedFiles?.length) {
      setFiles((preFile) => [
        ...preFile,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }

    console.log(reject);
    if(reject?.length){
        setRejectFile(prev => [...prev, ...reject])
    }
  }, []);
  console.log(rejectFile, "reject");

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept:{
        'image/png': []
    },
    maxSize: 1024 * 1000
  });

  const removeFile = (name) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };
  const removeRejectFile = (name) => {
    setRejectFile((files) => files.filter(({ file }) => file.name !== name));
  }

  const restAll =() => {
    setFiles([])
    setRejectFile([])
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(!files?.length) return

    const formData = new FormData();
    files.forEach(file => formData.append("file", file));
    formData.append("upload_preset", "friedbook");

    const URL =
      "https://api.cloudinary.com/v1_1/733828475565859:CQmMZwDlhESK2ZUw2gl-T59YVOs@ds4wulbab";
      const data = await fetch(URL, {
        method: "POST",
        body: formData
      }).then((res) => res.json())
   console.log(data);
  }

  return (
    <form onSubmit={handleSubmit}>
      {" "}
      <div className="p-16 mt-10 border border-neutral-300" {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag .n. drop some files here, or click to select files</p>
        )}
      </div>
      <button type="submit"> Upload Image</button>
      <button onClick={restAll} type="button"> Rest all</button>
      {/* preview section */}
      {/* <ul>
        {files.map((file) => (
          <li key={file.name}>{file?.name}
          <img src={file.preview} className="w-24 h-24"/>
          <li/>
        ))}
      </ul> */}
      <ul className="mt-6 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-12 gap-10">
        {files.map((file) => (
          <li className="relative h-32 rounded-md shadow-md" key={file.name}>
            <img className="w-28 h-28" alt={file.name} src={file.preview} />
            <button
              type="button"
              className="w-7 h-7 border border-red-400 rounded-full"
              onClick={() => removeFile(file.name)}
            >
              <FaXmark className="w-5 h-5 fill-white hover:fill-red-600" />{" "}
            </button>
            <p className="mt-12 text-neutral-500 text-[12px] font-semibold">
              {file.name}
            </p>
          </li>
        ))}
      </ul>
      <h2 className="text-2xl text-red-700">Reject File</h2>
      {/*  */}
      {rejectFile.map(({ errors, file }) => (
        <li key={errors.code}>
          <p className="text-black font-bold">{file.name}</p>
          <button
            type="button"
            className="w-7 h-7 border border-red-400 rounded-full"
            onClick={() => removeRejectFile(file.name)}
          >
            <FaXmark className="w-5 h-5 fill-white hover:fill-red-600" />{" "}
          </button>
        </li>
      ))}
    </form>
  );
};

export default Dropzone;
