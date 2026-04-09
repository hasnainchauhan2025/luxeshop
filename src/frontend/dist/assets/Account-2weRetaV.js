import { c as createLucideIcon, T as useAuth, j as reactExports, q as jsxRuntimeExports, t as motion, U as User, w as Button, Q as Package, H as Heart, L as Link, O as Separator, y as cn, V as LogOut, N as ue } from "./index-CgQGP8Uk.js";
import { I as Input } from "./input-CUkXXFPT.js";
import { L as Label } from "./label-B0XqX961.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode);
const NAV_LINKS = [
  {
    icon: Package,
    label: "My Orders",
    to: "/account/orders",
    desc: "Track and manage orders"
  },
  {
    icon: Heart,
    label: "Wishlist",
    to: "/account/wishlist",
    desc: "Saved items for later"
  }
];
function AccountPage() {
  const { user, isAuthenticated, login, logout } = useAuth();
  const [isSaving, setIsSaving] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    firstName: "",
    lastName: "",
    email: (user == null ? void 0 : user.email) ?? "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "US"
  });
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 32 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        className: "w-full max-w-sm text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 34, className: "text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl font-semibold mb-3", children: "Welcome Back" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8 text-sm leading-relaxed", children: "Sign in with Internet Identity to manage your profile, orders, and wishlist." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "lg",
              onClick: login,
              className: "w-full text-base font-semibold h-13 rounded-2xl shadow-elevated gap-2",
              "data-ocid": "account-login-btn",
              children: "Sign In with Internet Identity"
            }
          )
        ]
      }
    ) });
  }
  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsSaving(false);
    ue.success("Profile updated successfully");
  };
  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-3xl mx-auto px-6 pt-28 pb-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        className: "flex items-center gap-4 mb-10",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 26, className: "text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-semibold", children: (user == null ? void 0 : user.name) ?? "My Account" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs text-muted-foreground truncate max-w-xs mt-0.5",
                title: user == null ? void 0 : user.principal,
                children: user == null ? void 0 : user.principal
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, delay: 0.1 },
        className: "grid grid-cols-2 gap-3 mb-10",
        children: NAV_LINKS.map(({ icon: Icon, label, to, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "glass-card hover:border-primary/40 cursor-pointer group",
            "data-ocid": `account-nav-${label.toLowerCase().replace(/\s/g, "-")}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Icon,
                {
                  size: 22,
                  className: "text-primary mb-2 group-hover:scale-110 transition-smooth"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-medium text-sm mb-0.5", children: label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: desc })
            ]
          }
        ) }, label))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-10" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, delay: 0.2 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold mb-6", children: "Profile Details" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSave, className: "space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "First Name", id: "firstName", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "firstName",
                  placeholder: "Alex",
                  value: form.firstName,
                  onChange: handleChange("firstName"),
                  "data-ocid": "profile-first-name"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Last Name", id: "lastName", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "lastName",
                  placeholder: "Morgan",
                  value: form.lastName,
                  onChange: handleChange("lastName"),
                  "data-ocid": "profile-last-name"
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Email Address", id: "email", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "email",
                type: "email",
                placeholder: "alex@example.com",
                value: form.email,
                onChange: handleChange("email"),
                "data-ocid": "profile-email"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground -mt-2", children: "Shipping Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Street Address", id: "street", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "street",
                placeholder: "123 Lakeview Dr",
                value: form.street,
                onChange: handleChange("street"),
                "data-ocid": "profile-street"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "City", id: "city", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "city",
                  placeholder: "San Francisco",
                  value: form.city,
                  onChange: handleChange("city"),
                  "data-ocid": "profile-city"
                }
              ) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "State", id: "state", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "state",
                  placeholder: "CA",
                  value: form.state,
                  onChange: handleChange("state"),
                  "data-ocid": "profile-state"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "ZIP Code", id: "zip", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "zip",
                  placeholder: "94102",
                  value: form.zip,
                  onChange: handleChange("zip"),
                  "data-ocid": "profile-zip"
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Country", id: "country", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "country",
                placeholder: "United States",
                value: form.country,
                onChange: handleChange("country"),
                "data-ocid": "profile-country"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "submit",
                  size: "lg",
                  disabled: isSaving,
                  className: cn("gap-2 rounded-xl", isSaving && "opacity-80"),
                  "data-ocid": "profile-save-btn",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { size: 16 }),
                    isSaving ? "Saving…" : "Save Changes"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  size: "lg",
                  className: "gap-2 rounded-xl",
                  onClick: logout,
                  "data-ocid": "account-logout-btn",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { size: 16 }),
                    "Sign Out"
                  ]
                }
              )
            ] })
          ] })
        ]
      }
    )
  ] });
}
function FormField({
  label,
  id,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: id, className: "text-sm font-medium", children: label }),
    children
  ] });
}
export {
  AccountPage
};
