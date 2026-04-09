import { Layout } from "@/components/layout/Layout";
import { PageLoader } from "@/components/ui/LoadingSpinner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import { useEffect } from "react";

// Lazy page imports
import { Suspense, lazy } from "react";

const HomePage = lazy(() =>
  import("@/pages/Home").then((m) => ({ default: m.HomePage })),
);
const ProductsPage = lazy(() =>
  import("@/pages/Products").then((m) => ({ default: m.ProductsPage })),
);
const ProductDetailPage = lazy(() =>
  import("@/pages/ProductDetail").then((m) => ({
    default: m.ProductDetailPage,
  })),
);
const CartPage = lazy(() =>
  import("@/pages/Cart").then((m) => ({ default: m.CartPage })),
);
const CheckoutPage = lazy(() =>
  import("@/pages/Checkout").then((m) => ({ default: m.CheckoutPage })),
);
const CheckoutSuccessPage = lazy(() =>
  import("@/pages/CheckoutSuccess").then((m) => ({
    default: m.CheckoutSuccessPage,
  })),
);
const AccountPage = lazy(() =>
  import("@/pages/Account").then((m) => ({ default: m.AccountPage })),
);
const OrdersPage = lazy(() =>
  import("@/pages/Orders").then((m) => ({ default: m.OrdersPage })),
);
const WishlistPage = lazy(() =>
  import("@/pages/Wishlist").then((m) => ({ default: m.WishlistPage })),
);
const AdminPage = lazy(() =>
  import("@/pages/Admin").then((m) => ({ default: m.AdminPage })),
);

function LenisInit() {
  useEffect(() => {
    let lenis: { raf: (time: number) => void; destroy: () => void } | null =
      null;
    let rafId: number;

    Promise.all([import("lenis"), import("gsap")]).then(
      ([{ default: Lenis }, { gsap }]) => {
        lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
          smoothWheel: true,
        }) as { raf: (time: number) => void; destroy: () => void };

        import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
          gsap.registerPlugin(ScrollTrigger);
          if (lenis) {
            lenis.raf = (time: number) => {
              ScrollTrigger.update();
              return time;
            };
          }
        });

        const raf = (time: number) => {
          lenis?.raf(time);
          rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);
      },
    );

    return () => {
      cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  return null;
}

// Root layout
const rootRoute = createRootRoute({
  component: () => (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <LenisInit />
      <Outlet />
    </ThemeProvider>
  ),
});

// Layout wrapper helper
function WithLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      <Suspense fallback={<PageLoader />}>{children}</Suspense>
    </Layout>
  );
}

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <WithLayout>
      <HomePage />
    </WithLayout>
  ),
});

const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products",
  component: () => (
    <WithLayout>
      <ProductsPage />
    </WithLayout>
  ),
});

const productDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products/$id",
  component: () => (
    <WithLayout>
      <ProductDetailPage />
    </WithLayout>
  ),
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: () => (
    <WithLayout>
      <CartPage />
    </WithLayout>
  ),
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout",
  component: () => (
    <WithLayout>
      <CheckoutPage />
    </WithLayout>
  ),
});

const checkoutSuccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout/success",
  component: () => (
    <WithLayout>
      <CheckoutSuccessPage />
    </WithLayout>
  ),
});

const accountRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/account",
  component: () => (
    <WithLayout>
      <AccountPage />
    </WithLayout>
  ),
});

const ordersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/account/orders",
  component: () => (
    <WithLayout>
      <OrdersPage />
    </WithLayout>
  ),
});

const wishlistRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/account/wishlist",
  component: () => (
    <WithLayout>
      <WishlistPage />
    </WithLayout>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <WithLayout>
      <AdminPage />
    </WithLayout>
  ),
});

const adminProductsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/products",
  beforeLoad: async () => {
    redirect({ to: "/admin" });
  },
  component: () => (
    <WithLayout>
      <AdminPage />
    </WithLayout>
  ),
});

const adminOrdersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/orders",
  beforeLoad: async () => {
    redirect({ to: "/admin" });
  },
  component: () => (
    <WithLayout>
      <AdminPage />
    </WithLayout>
  ),
});

const adminUsersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/users",
  beforeLoad: async () => {
    redirect({ to: "/admin" });
  },
  component: () => (
    <WithLayout>
      <AdminPage />
    </WithLayout>
  ),
});

const adminCouponsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/coupons",
  beforeLoad: async () => {
    redirect({ to: "/admin" });
  },
  component: () => (
    <WithLayout>
      <AdminPage />
    </WithLayout>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  productsRoute,
  productDetailRoute,
  cartRoute,
  checkoutRoute,
  checkoutSuccessRoute,
  accountRoute,
  ordersRoute,
  wishlistRoute,
  adminRoute,
  adminProductsRoute,
  adminOrdersRoute,
  adminUsersRoute,
  adminCouponsRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
