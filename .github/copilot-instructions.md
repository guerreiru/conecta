# Conecta - AI Coding Assistant Instructions

## Architecture Overview

**Conecta** is a Next.js 15 service marketplace platform connecting service providers with clients. Built with App Router, React 19, TypeScript, and Tailwind CSS 4.

### Key Patterns

- **Route Groups**: Use `(private)` for authenticated routes (home, profile) and `(public)` for unauthenticated (login, register, plans)
- **Authentication Flow**: Direct backend calls via Axios (`/auth/login`, `/auth/refresh`, `/auth/me`) with httpOnly cookies
- **Role-Based Access**: Users have roles (client, provider, admin) - providers manage services, clients browse them
- **Context + Hooks Pattern**: State managed via Context API (`AuthContext`, `CategoriesContext`) exposed through custom hooks (`useAuth`, `useCategories`)

## Development Workflow

```powershell
# Development (uses Turbopack)
pnpm dev

# Build & Production
pnpm build
pnpm start

# Linting
pnpm lint
```

**Default dev server**: http://localhost:3001 (not 3000)

## Critical Configuration

### Environment Variables

- `NEXT_PUBLIC_API_URL`: Client-side API calls (defaults to http://localhost:3001)
- `API_BASE_URL`: Server-side API routes (defaults to http://localhost:3001)

### Path Aliases

Use `@/` for all src imports:

```typescript
import { api } from "@/services/api";
import { useAuth } from "@/hooks/useAuth";
```

## Authentication Architecture

**Direct backend integration** (chamadas diretas via Axios com httpOnly cookies):

1. **Client login** → `api.post("/auth/login")` → backend retorna tokens em cookies httpOnly
2. Backend seta cookies: `accessToken` (15min), `refreshToken` (7 dias)
3. **Auto-refresh**: Interceptor Axios detecta `TOKEN_EXPIRED` e chama `/auth/refresh` automaticamente
4. **Session recovery**: No load da app, chama `GET /auth/me` (não rotaciona refresh token)
5. Middleware (`src/middleware.ts`) protege rotas baseado em cookies

**Token refresh flow** (automatizado pelo interceptor):

- Requisição retorna 401 com `code: "TOKEN_EXPIRED"`
- Interceptor chama `POST /auth/refresh` (rotaciona ambos os tokens)
- Backend atualiza cookies httpOnly automaticamente
- Requisição original é retentada com novos tokens
- Se refresh falhar, redireciona para `/login`

**Key patterns to follow**:

- ✅ Sempre use `api` (Axios) de `@/services/api` com `withCredentials: true`
- ✅ Cookies são httpOnly - nunca tente ler/escrever do client-side
- ✅ Use `GET /auth/me` para recuperar sessão (F5) - não rotaciona refresh token
- ✅ Use `POST /auth/refresh` para renovar tokens - rotaciona ambos
- ✅ Interceptor Axios trata refresh automaticamente - não implemente manualmente
- ✅ Nunca crie rotas `/api/*` intermediárias - chame backend diretamente
- ✅ Backend responde com `code: "TOKEN_EXPIRED"` para tokens expirados

## Component Conventions

### React Query Patterns

All data fetching uses **TanStack Query (React Query)** for automatic caching and state management:

**Service Queries** (`src/hooks/useServiceQueries.ts`):

- `useProviderServices(userId)` - Fetch services from a specific provider
- `useSearchServices(params)` - Search services with filters (state, city, category, term)
- `useCreateService()` - Mutation to create service
- `useUpdateService()` - Mutation to update service
- `useDeleteService()` - Mutation to delete service

**Usage example**:

```typescript
// Query (automatic caching)
const { data: services, isLoading } = useProviderServices(userId);

// Mutation (with toast notifications)
const createMutation = useCreateService();
createMutation.mutate(data, {
  onSuccess: () => {
    /* callback */
  },
});
```

**Cache management**: Mutations automatically invalidate related queries using `queryClient.invalidateQueries()`.

### Error Handling

- **ErrorBoundary**: Wraps entire app in `layout.tsx` to catch React errors
- Shows user-friendly error UI with retry option
- Development mode shows error details

### Form Patterns

All forms use **React Hook Form + Zod validation**:

```typescript
const schema = z.object({
  title: z.string().min(3, "Mensagem de erro"),
});

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm({
  resolver: zodResolver(schema),
});
```

Standard form components in `src/components/ui/`: `Input`, `Select`, `Textarea`, `Button`

### Data Fetching

**ALWAYS use React Query for data fetching** - provides automatic caching, loading states, and error handling:

- **Queries** (GET operations): Use for fetching data with automatic cache

  ```typescript
  const { data, isLoading, isError } = useProviderServices(userId);
  ```

- **Mutations** (POST/PUT/DELETE): Use for data modifications with cache invalidation
  ```typescript
  const mutation = useCreateService();
  mutation.mutate(data, { onSuccess: () => {} });
  ```

**Backend API calls**: Use `api` from `@/services/api` (Axios instance)

```typescript
import { api } from "@/services/api";
const response = await api.get("/services");
```

**External APIs**: Create dedicated Axios instance

```typescript
// Example: src/services/viaCepApi.ts
import axios from "axios";
export const viaCepApi = axios.create({
  baseURL: "https://viacep.com.br/ws",
});
```

**Benefits of React Query**:

- ✅ Automatic caching (5min staleTime by default)
- ✅ Loading/error states managed automatically
- ✅ Cache invalidation on mutations
- ✅ Retry logic built-in
- ✅ Deduplication of requests

**Toast notifications**: `react-toastify` for all user feedback
**Error messages**: Use constants from `@/constants/messages`

### Modal Pattern

All modals follow this structure (see `ServiceForm` usage):

```typescript
<Modal open={isOpen} onClose={handleClose}>
  <div onClick={handleClose}>
    {" "}
    {/* Backdrop */}
    <div onClick={(e) => e.stopPropagation()}>
      {" "}
      {/* Content */}
      {/* Modal content */}
    </div>
  </div>
</Modal>
```

## State Management

**No external state libraries** - uses React Context pattern:

1. Create context: `src/contexts/[Name]Context.tsx`
2. Create provider: `src/providers/[name]Provider.tsx`
3. Create hook: `src/hooks/use[Name].tsx`
4. Wrap in `layout.tsx`

Example: `AuthProvider` wraps app, exposes `useAuth()` hook

## Styling Conventions

- **Tailwind CSS 4** with dark mode support via `dark:` variants
- Color palette: Lime (primary), Black/White (base), Stone/Gray (neutrals)
- Responsive: Mobile-first, use `md:` and `lg:` breakpoints
- Icons: `@phosphor-icons/react` library

## Type Definitions

All types in `src/types/`:

- `User`: User entity with role, address
- `Service`: Service with category, price, provider
- `AuthData`: Login/refresh response structure
- Capitalize file names: `Service.ts`, `User.ts`

## API Integration

**Backend URL assumption**: http://localhost:3001 (separate API server)

Key endpoints:

- `/auth/login`, `/auth/refresh`, `/auth/logout`
- `/services`, `/services/search?stateId=&cityId=&searchTerm=&categoryId=`
- `/services/provider/{userId}` (provider's services)

## Role-Specific Features

**Providers**:

- Manage services CRUD (title, description, price, typeOfChange, category)
- Dashboard shows service count and list
- Services linked to user's address (city/state)

**Clients**:

- Browse services by location and category
- View provider profiles
- No service management UI

## Common Utilities

- `capitalizeFirstLetter()`: Format display strings
- `formatToBRL()`: Currency formatting for prices
- `whatsAppMessage()`: Generate WhatsApp contact links
- `convertResultToProfile()`: Transform API responses

## Dark Mode

All components support dark mode. Use Tailwind `dark:` variants consistently.

## Notes

- Use `pnpm` as package manager
- TypeScript strict mode enabled
- ESLint configuration via `eslint.config.mjs`
- Middleware runs on every request - keep logic minimal
