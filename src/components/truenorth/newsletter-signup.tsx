import { useEffect } from "react";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

const BREVO_FORM_ACTION =
  "https://ead45cf6.sibforms.com/serve/MUIFAAfD4YTy4zjHqqCNye8msJKsWvhRgFMGoL_SRaA_ipU_CQdGccjvmBfMrOdeY9AyzUo5E_7dj0aOOyXYUAqEBd5XW3nLxhu4bvavm3msj7zJZ4japTd92MjuU3GO4d3AlRh5ngSofcBtwIiwXluMjfyMNa-5cINOgwvRaLylnZocFK27-6IWFSII0WV-KQk6iK3baZoRVOj-cQ==";

type BrevoWindow = Window & {
  REQUIRED_CODE_ERROR_MESSAGE?: string;
  LOCALE?: string;
  EMAIL_INVALID_MESSAGE?: string;
  SMS_INVALID_MESSAGE?: string;
  REQUIRED_ERROR_MESSAGE?: string;
  GENERIC_INVALID_MESSAGE?: string;
  INVALID_NUMBER?: string;
  INVALID_DATE?: string;
  REQUIRED_MULTISELECT_MESSAGE?: string;
  translation?: {
    common: Record<string, string>;
  };
  AUTOHIDE?: boolean;
};

function BrevoField({
  id,
  label,
  type = "text",
  autoComplete,
}: {
  id: "FIRSTNAME" | "LASTNAME" | "EMAIL";
  label: string;
  type?: "text" | "email";
  autoComplete: string;
}) {
  return (
    <div className="sib-input newsletter-field">
      <div className="form__entry entry_block">
        <div className="form__label-row">
          <label className="entry__label" htmlFor={id} data-required="*">
            {label}
          </label>
          <div className="entry__field">
            <input
              className="input"
              id={id}
              name={id}
              type={type}
              autoComplete={autoComplete}
              maxLength={id === "EMAIL" ? 254 : 100}
              required
              aria-required="true"
            />
          </div>
        </div>
        <label className="entry__error entry__error--primary" htmlFor={id} />
      </div>
    </div>
  );
}

export function NewsletterSignup() {
  useEffect(() => {
    const brevoWindow = window as BrevoWindow;
    brevoWindow.REQUIRED_CODE_ERROR_MESSAGE = "Please choose a country code";
    brevoWindow.LOCALE = "en";
    brevoWindow.EMAIL_INVALID_MESSAGE = "Please enter a valid email address.";
    brevoWindow.SMS_INVALID_MESSAGE = "The information provided is invalid.";
    brevoWindow.REQUIRED_ERROR_MESSAGE = "This field cannot be left blank.";
    brevoWindow.GENERIC_INVALID_MESSAGE = "Please review this field and try again.";
    brevoWindow.INVALID_NUMBER = "Please enter a valid number.";
    brevoWindow.INVALID_DATE = "Please enter a valid date.";
    brevoWindow.REQUIRED_MULTISELECT_MESSAGE = "Please select at least one option.";
    brevoWindow.translation = {
      common: {
        selectedList: "{quantity} list selected",
        selectedLists: "{quantity} lists selected",
        selectedOption: "{quantity} selected",
        selectedOptions: "{quantity} selected",
      },
    };
    brevoWindow.AUTOHIDE = false;

    if (document.querySelector('script[data-truenorth-brevo="true"]')) return;

    const script = document.createElement("script");
    script.src = "https://sibforms.com/forms/end-form/build/main.js";
    script.defer = true;
    script.dataset["truenorthBrevo"] = "true";
    document.body.appendChild(script);
  }, []);

  return (
    <section id="newsletter" className="newsletter-section px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[.8fr_1.2fr] md:items-start md:gap-20">
        <div>
          <p className="newsletter-eyebrow">Letters from TrueNorth</p>
          <h2 className="mt-6 font-display text-4xl leading-[1.08] sm:text-5xl">
            A quieter note,<br />sent your way.
          </h2>
          <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground">
            Join the TruSpace for thoughtful questions, community stories, and gentle reminders that you don’t have to find your way alone.
          </p>
        </div>

        <div id="sib-form-container" className="sib-form-container newsletter-form-wrap">
          <div id="error-message" className="sib-form-message-panel newsletter-message newsletter-message-error" role="alert">
            <div className="sib-form-message-panel__text">
              <span className="sib-form-message-panel__inner-text">Your subscription could not be saved. Please try again.</span>
            </div>
          </div>
          <div id="success-message" className="sib-form-message-panel newsletter-message newsletter-message-success" role="status" aria-live="polite">
            <div className="sib-form-message-panel__text">
              <span className="sib-form-message-panel__inner-text">You’re in. Your subscription has been successful.</span>
            </div>
          </div>

          <div id="sib-container" className="sib-container--large sib-container--vertical">
            <form id="sib-form" method="POST" action={BREVO_FORM_ACTION} data-type="subscription">
              <div className="newsletter-fields">
                <BrevoField id="FIRSTNAME" label="First name" autoComplete="given-name" />
                <BrevoField id="LASTNAME" label="Last name" autoComplete="family-name" />
              </div>
              <BrevoField id="EMAIL" label="Email address" type="email" autoComplete="email" />

              <div className="sib-optin newsletter-consent" data-required="true">
                <div className="form__entry entry_mcq">
                  <div className="form__label-row">
                    <label className="newsletter-checkbox" htmlFor="OPT_IN">
                      <input type="checkbox" className="input_replaced" value="1" id="OPT_IN" name="OPT_IN" required />
                      <span>I agree to receive TrueNorth newsletters and accept the data privacy statement.</span>
                    </label>
                  </div>
                  <label className="entry__error entry__error--primary" htmlFor="OPT_IN" />
                  <p className="entry__specification">You may unsubscribe at any time using the link in our newsletter.</p>
                </div>
              </div>

              <input type="text" name="email_address_check" value="" className="input--hidden" readOnly tabIndex={-1} aria-hidden="true" />
              <input type="hidden" name="locale" value="en" />

              <Button className="sib-form-block__button sib-form-block__button-with-loader newsletter-submit" form="sib-form" type="submit" size="lg">
                <svg className="progress-indicator__icon sib-hide-loader-icon" viewBox="0 0 512 512" aria-hidden="true">
                  <path d="M460.116 373.846l-20.823-12.022c-5.541-3.199-7.54-10.159-4.663-15.874 30.137-59.886 28.343-131.652-5.386-189.946-33.641-58.394-94.896-95.833-161.827-99.676C261.028 55.961 256 50.751 256 44.352V20.309c0-6.904 5.808-12.337 12.703-11.982 83.556 4.306 160.163 50.864 202.11 123.677 42.063 72.696 44.079 162.316 6.031 236.832-3.14 6.148-10.75 8.461-16.728 5.01z" />
                </svg>
                Subscribe <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}