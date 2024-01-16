import React from "react";
export const LoadingOverlay = (props: any) => {
  return (
    <div className="ag-overlay-loading-center">{props.loadingMessage}</div>
  );
};

export const NoRowOverlay = (props: any) => {
  return (
    <div className="ag-overlay-loading-center" style={{ height: "9%" }}>
      {props.noRowsMessageFunc() || "مشکلی رخ داده است."}
    </div>
  );
};
