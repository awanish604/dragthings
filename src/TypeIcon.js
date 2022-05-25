import React from "react";
import FolderIcon from "@mui/icons-material/Folder";
import ImageIcon from "@mui/icons-material/Image";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DescriptionIcon from "@mui/icons-material/Description";

export const TypeIcon = (props) => {
  if (props.droppable) {
    return <FolderIcon fontSize="large" />;
  }

  switch (props.fileType) {
    case "image":
      return <ImageIcon fontSize="large"/>;
    case "csv":
      return <ListAltIcon fontSize="large"/>;
    case "text":
      return <DescriptionIcon fontSize="large"/>;
    default:
      return null;
  }
};
