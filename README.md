This is a minimal npm package for Laravel types and a hook for displaying a query.

If you have a suggestion or just want to help improve this package, your contributions are very welcome!

## Usage

This package provides 5 types to use for the response of a Laravel request.

LaravelResponse<T, E>;
LaravelSuccess<T>;
LaravelError<E>;
LaravelObject;
LaravelPagination<T>;

### LaravelResponse

This is the main type that you will use to handle the response of a Laravel request. Always use this type to handle the response of a request. It will never let you access the data of the response without checking if the success property is true.

```ts
type LaravelResponse<S = unknown, E = unknown> =
  | LaravelSuccess<S>
  | LaravelError<E>
  | undefined;

const response: LaravelResponse<User, string[]> = (await axios.get("/me")).data;
if (response?.success) {
  console.log(response.data);
} else {
  console.log(response.errors ?? "Something went wrong");
}
```

### LaravelSuccess

This type is used when the request is successful.

```ts
interface LaravelSuccess<T = unknown> {
  success: true;
  message: string;
  data: T;
}

interface User {
  id: number;
  name: string;
  email: string;
}

const success: LaravelSuccess<User> = {
  success: true,
  message: "User retrieved",
  data: {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
  },
};
```

### LaravelError

This type is used when the request is unsuccessful. Providing an array of strings as the generic type will allow you to access the different errors of the request.
Note that errors is not always defined, always have a custom fallback or refer to the message key.

```ts
interface LaravelError<T extends Array<string> | unknown = unknown> {
  success: false;
  message: string;
  errors?: T extends Array<string> ? { [k in T[number]]: string[] } : T;
}

const error: LaravelError<["email", "password"]> = {
  success: false,
  message: "Something went wrong",
  errors: {
    email: ["The email is invalid"],
    password: ["The password is invalid"],
  },
};
```

### LaravelObject

This type is used to represent the common Laravel object.

```ts
interface LaravelObject {
  id: number;
  created_at: string;
  updated_at: string;
}

interface User extends LaravelObject {
  name: string;
  email: string;
  address: string;
}
```

### LaravelPagination

This type is used to represent a Laravel pagination. Use it inside the LaravelResponse type to handle the pagination of a request.

```ts
interface LaravelPagination<T = unknown> {
  current_page: number;
  data: T;
  next_page_url: string | null;
  total_page: number;
  prev_page_url: string | null;
}

interface Posts
  extends LaravelResponse<LaravelPagination<Post>, ["date", "page"]> {}
type DifferentPosts = LaravelPagination<Post[]>;
```
