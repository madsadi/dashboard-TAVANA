import AddAgent from "./add-agent";
import EditAgent from "./edit-agent";

export const CustomerAgentToolbar = () => {
  return (
    <div className="toolbar p-2 border-x border-border">
      <AddAgent />
      <EditAgent />
    </div>
  );
};
