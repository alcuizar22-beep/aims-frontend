// P06 – one login for staff and clients; the role decides where it lands.
const STAFF = [
  ['admin', 'Administrator'], ['gm', 'Owner / GM'], ['bidding', 'Bidding & Contracts'], ['purchasing', 'Purchasing'],
  ['warehouse', 'Warehouse & Logistics'], ['production', 'Production'], ['qa', 'QA Inspector'], ['accounting', 'Accounting'],
  ['client', 'Client (portal user)'],
]

export const loginPage = () => `
<div class="grid min-h-screen place-items-center p-4" x-data="{mode:'login', err:'', sent:false}">
  <div class="w-full max-w-md">
    <a href="index.html" class="mb-6 flex items-center justify-center gap-2"><span class="grid h-11 w-11 place-items-center rounded-md bg-primary font-head text-xl text-accent">A</span><span class="font-head text-2xl text-primary">AIMS</span></a>
    <div class="card p-6">
      <form x-show="mode==='login'" novalidate
        @submit.prevent="
          const f = new FormData($el);
          if (!f.get('email') || !f.get('password')) { err = 'Enter your email and password.'; return }
          err = '';
          const role = f.get('role');
          try { localStorage.setItem('aims_role', role) } catch {}
          location.href = role === 'client' ? 'portal.html' : 'app.html'">
        <h1 class="font-head text-2xl text-primary">Sign in</h1>
        <p class="mt-1 text-sm text-muted">Demo build: any email and password work. Pick a role to preview its screens.</p>
        <label class="label mt-4" for="email">Email</label><input id="email" name="email" type="email" class="input" autocomplete="username" value="demo@aimforce.example">
        <label class="label mt-3" for="password">Password</label><input id="password" name="password" type="password" class="input" autocomplete="current-password" value="password">
        <label class="label mt-3" for="role">Sign in as (demo)</label>
        <select id="role" name="role" class="input">${STAFF.map(([v, l]) => `<option value="${v}">${l}</option>`).join('')}</select>
        <p class="mt-2 text-sm text-danger" x-show="err" x-text="err"></p>
        <button class="btn btn-primary mt-5 w-full">Sign in</button>
        <button type="button" class="mt-3 w-full text-center text-sm link" @click="mode='forgot'">Forgot password?</button>
      </form>

      <form x-show="mode==='forgot'" x-cloak novalidate @submit.prevent="sent = true">
        <h1 class="font-head text-2xl text-primary">Reset your password</h1>
        <p class="mt-1 text-sm text-muted">We email you a link that expires in 60 minutes.</p>
        <label class="label mt-4" for="femail">Email</label><input id="femail" type="email" class="input" required>
        <p class="mt-3 rounded-md bg-green-50 p-3 text-sm text-success" x-show="sent">If that email exists, a reset link is on its way.</p>
        <button class="btn btn-primary mt-5 w-full">Send reset link</button>
        <button type="button" class="mt-3 w-full text-center text-sm link" @click="mode='reset'">I have a reset link</button>
        <button type="button" class="mt-1 w-full text-center text-sm link" @click="mode='login'">Back to sign in</button>
      </form>

      <form x-show="mode==='reset'" x-cloak novalidate x-data="{p:'',c:''}" @submit.prevent="if (p.length >= 8 &amp;&amp; p === c) mode = 'login'; else err = 'Passwords must match and be at least 8 characters.'">
        <h1 class="font-head text-2xl text-primary">Choose a new password</h1>
        <label class="label mt-4" for="np">New password</label><input id="np" type="password" class="input" x-model="p">
        <label class="label mt-3" for="cp">Confirm password</label><input id="cp" type="password" class="input" x-model="c">
        <p class="mt-2 text-sm text-danger" x-show="err" x-text="err"></p>
        <button class="btn btn-primary mt-5 w-full">Save password</button>
      </form>
    </div>
  </div>
</div>`