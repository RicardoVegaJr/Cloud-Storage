import React, { useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "../../blocks/Dashboard.css";

const ROOT_FOLDER_ID = "root";

const createId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const formatSize = (bytes) => {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1
  );
  return `${(bytes / 1024 ** index).toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
};

function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const fileInputRef = useRef(null);

  const [folders, setFolders] = useState([
    { id: "folder-documents", name: "Documents" },
    { id: "folder-photos", name: "Photos" },
  ]);
  const [files, setFiles] = useState([]);
  const [currentFolderId, setCurrentFolderId] = useState(ROOT_FOLDER_ID);
  const [newFolderName, setNewFolderName] = useState("");
  const [renamingFileId, setRenamingFileId] = useState(null);
  const [renameValue, setRenameValue] = useState("");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  const currentFolder =
    folders.find((folder) => folder.id === currentFolderId) || null;
  const visibleFiles = files.filter(
    (file) => file.folderId === currentFolderId
  );

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFilesSelected = (event) => {
    const selected = Array.from(event.target.files || []);
    if (selected.length === 0) return;

    const uploaded = selected.map((file) => ({
      id: createId(),
      name: file.name,
      size: file.size,
      type: file.type || "Unknown",
      folderId: currentFolderId,
    }));
    setFiles((prev) => [...prev, ...uploaded]);
    event.target.value = "";
  };

  const handleDeleteFile = (fileId) => {
    setFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const handleStartRename = (file) => {
    setRenamingFileId(file.id);
    setRenameValue(file.name);
  };

  const handleRenameSubmit = (event) => {
    event.preventDefault();
    const trimmed = renameValue.trim();
    if (trimmed) {
      setFiles((prev) =>
        prev.map((file) =>
          file.id === renamingFileId ? { ...file, name: trimmed } : file
        )
      );
    }
    setRenamingFileId(null);
    setRenameValue("");
  };

  const handleMoveFile = (fileId, targetFolderId) => {
    if (!targetFolderId) return;
    setFiles((prev) =>
      prev.map((file) =>
        file.id === fileId ? { ...file, folderId: targetFolderId } : file
      )
    );
  };

  const handleCreateFolder = (event) => {
    event.preventDefault();
    const trimmed = newFolderName.trim();
    if (!trimmed) return;
    setFolders((prev) => [...prev, { id: createId(), name: trimmed }]);
    setNewFolderName("");
  };

  const handleDeleteFolder = (folderId) => {
    setFolders((prev) => prev.filter((folder) => folder.id !== folderId));
    // Files from the deleted folder are moved back to the root.
    setFiles((prev) =>
      prev.map((file) =>
        file.folderId === folderId
          ? { ...file, folderId: ROOT_FOLDER_ID }
          : file
      )
    );
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <h1 className="dashboard__title">My Files</h1>
        <button
          type="button"
          className="dashboard__signout"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </header>

      <div className="dashboard__toolbar">
        <button
          type="button"
          className="dashboard__button dashboard__button--primary"
          onClick={handleUploadClick}
        >
          Upload Files
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          hidden
          data-testid="file-input"
          onChange={handleFilesSelected}
        />
        <form className="dashboard__new-folder" onSubmit={handleCreateFolder}>
          <input
            type="text"
            className="dashboard__input"
            placeholder="New folder name"
            value={newFolderName}
            onChange={(event) => setNewFolderName(event.target.value)}
          />
          <button type="submit" className="dashboard__button">
            Create Folder
          </button>
        </form>
      </div>

      <nav className="dashboard__breadcrumb" aria-label="Current location">
        <button
          type="button"
          className="dashboard__crumb"
          onClick={() => setCurrentFolderId(ROOT_FOLDER_ID)}
        >
          Home
        </button>
        {currentFolder && (
          <span className="dashboard__crumb-current">
            / {currentFolder.name}
          </span>
        )}
      </nav>

      {currentFolderId === ROOT_FOLDER_ID && (
        <section className="dashboard__folders" aria-label="Folders">
          {folders.map((folder) => (
            <div key={folder.id} className="dashboard__folder-card">
              <button
                type="button"
                className="dashboard__folder-open"
                onClick={() => setCurrentFolderId(folder.id)}
              >
                📁 {folder.name}
              </button>
              <button
                type="button"
                className="dashboard__icon-button"
                aria-label={`Delete folder ${folder.name}`}
                onClick={() => handleDeleteFolder(folder.id)}
              >
                🗑
              </button>
            </div>
          ))}
          {folders.length === 0 && (
            <p className="dashboard__empty">No folders yet. Create one above.</p>
          )}
        </section>
      )}

      <section className="dashboard__files" aria-label="Files">
        {visibleFiles.length === 0 ? (
          <p className="dashboard__empty">
            No files here. Click "Upload Files" to add some.
          </p>
        ) : (
          <ul className="dashboard__file-list">
            {visibleFiles.map((file) => (
              <li key={file.id} className="dashboard__file-row">
                {renamingFileId === file.id ? (
                  <form
                    className="dashboard__rename-form"
                    onSubmit={handleRenameSubmit}
                  >
                    <input
                      type="text"
                      className="dashboard__input"
                      value={renameValue}
                      autoFocus
                      onChange={(event) => setRenameValue(event.target.value)}
                    />
                    <button type="submit" className="dashboard__button">
                      Save
                    </button>
                    <button
                      type="button"
                      className="dashboard__button"
                      onClick={() => setRenamingFileId(null)}
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <span className="dashboard__file-name">📄 {file.name}</span>
                )}
                <span className="dashboard__file-meta">
                  {formatSize(file.size)}
                </span>
                <div className="dashboard__file-actions">
                  <button
                    type="button"
                    className="dashboard__button"
                    onClick={() => handleStartRename(file)}
                  >
                    Rename
                  </button>
                  <select
                    className="dashboard__select"
                    value=""
                    aria-label={`Move ${file.name}`}
                    onChange={(event) =>
                      handleMoveFile(file.id, event.target.value)
                    }
                  >
                    <option value="" disabled>
                      Move to…
                    </option>
                    {currentFolderId !== ROOT_FOLDER_ID && (
                      <option value={ROOT_FOLDER_ID}>Home</option>
                    )}
                    {folders
                      .filter((folder) => folder.id !== currentFolderId)
                      .map((folder) => (
                        <option key={folder.id} value={folder.id}>
                          {folder.name}
                        </option>
                      ))}
                  </select>
                  <button
                    type="button"
                    className="dashboard__button dashboard__button--danger"
                    onClick={() => handleDeleteFile(file.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
