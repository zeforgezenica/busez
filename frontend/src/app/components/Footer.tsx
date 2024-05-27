import Link from "next/link";
import { Card, Spacer } from "@nextui-org/react";

const Footer: React.FC = () => {
  return (
    <Card
      shadow="sm"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        borderTop: "1px solid #eaeaea",
      }}
    >
      <div style={{ padding: "2rem 0" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            padding: "0 1rem",
          }}
        >
          <div>
            <p>&copy; {new Date().getFullYear()} ZeForge Zenica</p>
            <p>App for searching bus routes</p>
          </div>
          <div>
            <p>
              <strong>Quick Links:</strong>
            </p>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/cities">Cities</Link>
              </li>
              <li>
                <Link href="/countries">Countries</Link>
              </li>
              <li>
                <Link href="/routes">Routes</Link>
              </li>
              <li>
                <Link href="/agencies">Agencies</Link>
              </li>
              <li>
                <Link href="/stations">Stations</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Footer;
