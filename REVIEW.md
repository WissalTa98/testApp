# Code Review of UserList.ts
---

## Bugs Found

### 1. Missing "await" on res.json()

```ts
const data = res.json();
```

res.json() returns a Promise. Without "await", 'data' is a Promise object, not the actual JSON. So "this.users" gets assigned a Promise and every method that touches it silently breaks. 
Nothing crashes, it just doesn't work.

**Fix:**
```ts
const data: User[] = await res.json();
```

---

### 2. XSS through "innerHTML"

```ts
el.innerHTML = `${user.name}`;
```

If a user's name contains something like <a href="javascript:alert('XSS executed')">Click here for a free prize!</a>, it gets executed. 
This is a textbook cross-site scripting vulnerability.

**Fix:**
```ts
el.textContent = user.name;
```

"textContent" treats everything as plain text. No HTML gets parsed.

---

### 3. "any" everywhere

users: any[], filter: any, untyped parameters on constructor, renderUser, deleteUser
The point of TypeScript is type safety, and this file has none.

**Fix:**
Define a type and use it:
```ts
interface User {
  id: number;
  name: string;
  index?: number;
}

export class UserList {
  users: User[] = [];
  filter: string | null = null;

  constructor(data: User[]) { ... }
}
```

---

### 4. "==" instead of "==="

```ts
if (this.filter == null)
u.name == this.filter
```

Using == can automatically convert values to different types, which may lead to unexpected results. 
For example, 'null == undefined' returns 'true'. To avoid bugs and make your code clearer, it's usually better to use strict equality (`===`) unless you have a specific reason to use '=='.

---

### 5. No error handling on "fetch"

The request might fail because of a network issue, a server error (like a 500 response), or invalid JSON data. 
Since these cases aren't handled, the application can stop working without showing any clear error.

---

### 6. No return types on methods

The functions getFilteredUsers(), loadUsers(), renderUser(), and deleteUser() don't specify what they return. 
Adding return types would make the code easier to understand and help other developers know what to expect without looking at the implementation.

---

### 7. DOM logic in a data class

The "renderUser" method is responsible for creating HTML elements, but a "UserList" class should mainly handle user data and logic. 
Mixing UI creation with data management makes the class more difficult to maintain and test.

---
