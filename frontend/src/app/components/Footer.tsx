const Footer: React.FC = () => {
  return (
    <footer className="bg-content1 border-t border-gray-300 mt-auto py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="text-gray-300">
              &copy; {new Date().getFullYear()}{" "}
              <a
                href={"https://zeforge.ba"}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--primary-blue)",
                  textDecoration: "underline",
                }}
              >
                ZeForge Zenica
              </a>
            </p>
            <p className="text-gray-300">App for searching bus routes</p>
          </div>
          <div className="mt-4 sm:mt-0 text-left">
            <p className="text-left sm:text-center">
              <strong>Contact Us:</strong>
            </p>
            <p className="text-gray-300 text-left">
              Email:{" "}
              <a
                href={`mailto:${"info@zeforge.ba"}`}
                style={{
                  color: "var(--primary-blue)",
                  textDecoration: "underline",
                }}
              >
                info@zeforge.ba
              </a>
            </p>
            <p className="text-gray-300 text-left">
              Phone:{" "}
              <a
                href={`tel:${"+38732979844"}`}
                style={{
                  color: "var(--primary-blue)",
                  textDecoration: "underline",
                }}
              >
                +387 32 979 844
              </a>
            </p>
          </div>
        </div>
        <div className="my-4 border-t border-gray-300" />
        <div className="text-center">
          <p className="text-gray-300">
            Made with ❤️ by the open source community of Zenica
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
