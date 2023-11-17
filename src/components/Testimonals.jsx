import { Link } from "react-router-dom";
import { Button } from "@nextui-org/react";

export default function Testimonals() {
  return (
    <div>
      <h2>Website templates for every purpose</h2>
      <p>
        Start with a flexible designer template or build your own, then
        customize to fit your style and professional needs using our
        drag-and-drop website builder.
      </p>
      <Link>
        <Button color="primary">EXPLORE ALL TEMPLATES</Button>
      </Link>
    </div>
  );
}
