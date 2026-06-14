import { loveLetter } from "./loveLetterData.js";

export default function LoveLetter() {
  const { greeting, paragraphs, closing, signature, date } = loveLetter;

  return (
    <article className="love-letter" aria-label="Love letter">
      <div className="love-letter-sheet">
        <div className="love-letter-content">
          {greeting && <p className="love-letter-greeting script">{greeting}</p>}

          {paragraphs.map((text, i) => (
            <p key={i} className="love-letter-paragraph">
              {text}
            </p>
          ))}
        </div>

        {(closing || signature || date) && (
          <footer className="love-letter-footer">
            {(closing || signature) && (
              <div className="love-letter-signoff">
                {closing && <p className="love-letter-closing">{closing}</p>}
                {signature && (
                  <p className="love-letter-signature script">{signature}</p>
                )}
              </div>
            )}
            {date && <p className="love-letter-date">{date}</p>}
          </footer>
        )}
      </div>
    </article>
  );
}
