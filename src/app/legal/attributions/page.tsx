
export default function AttributionsPage() {
    return (
      <main className="p-6 max-w-4xl mx-auto">
        <article className="prose dark:prose-invert text-sm max-w-none">
          <h2 className="mb-4">Third-Party Software &amp; Services</h2>
          <ul className="mb-8 list-disc list-inside space-y-2">
            <li>
              <strong>Development:</strong> Next.js (MIT License), React (MIT License), Tailwind CSS (MIT License)
            </li>
            <li>
              <strong>UI Components:</strong> shadcn/ui (MIT License), lucide-react (ISC License)
            </li>
            <li>
              <strong>Analytics:</strong> Google Analytics 4 &amp; Google Firebase SDK (subject to Google Terms of Service)
            </li>
            <li>
              <strong>Consent Management:</strong> Google Consent Mode v2 (subject to Google Privacy &amp; Terms)
            </li>
          </ul>
  
          <h2 className="mb-4">Audio Attribution</h2>
          <h3 className="mb-1 leading-relaxed">Background Audio:</h3>
              <p className="mb-1 leading-relaxed"><strong>Title:</strong> "Overheat"</p>
              <p className="mb-1 leading-relaxed"><strong>Artist:</strong> Kevin MacLeod</p>
              <p className="mb-1 leading-relaxed"><strong>Source:</strong> incompetech.com</p>
              <p className="leading-relaxed">
                <strong>License:</strong> Creative Commons Attribution 4.0 International License (
                <a
                  href="http://creativecommons.org/licenses/by/4.0/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-primary"
                >
                  http://creativecommons.org/licenses/by/4.0/
                </a>
                )
              </p>
        </article>
      </main>
    );
  }
  
