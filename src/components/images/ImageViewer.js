import React, { Component } from "react";
import { connect } from "react-redux";

class ImageViewer extends Component {
  render() {
    const { projectRoot, image, folder, zoomRatio } = this.props;
    return (
      <div className="ImageViewer">
        <div className="ImageViewer__Content">
          {image && (
            <div
              className="ImageViewer__Image"
              style={{ transform: `scale(${zoomRatio})` }}
            >
              <img alt="" src={`${projectRoot}/assets/${folder}/${image}`} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { id, section } = state.navigation;
  const files =
    section === "backgrounds"
      ? state.project.present.images
      : state.project.present.spriteSheets;
  const folder = section === "backgrounds" ? "backgrounds" : "sprites";
  const image = files.find(file => file.id === id) || files[0];
  return {
    projectRoot: state.document && state.document.root,
    projectId: state.project.present.id,
    image: image && image.filename,
    folder,
    zoomRatio: (state.editor.zoom || 100) / 100
  };
}

export default connect(mapStateToProps)(ImageViewer);