---
pubDatetime: 2024-07-18T00:00:00Z
modDatetime: 2024-07-18T00:00:00Z
title: Streamlining Your Laravel Inertia Vue Project  with Pint, Prettier, and ESLint.
slug: streamlining-laravel-inertia-vue-app-with-eslint-prettier-pint
featured: true
draft: false
tags:
  - laravel
  - inertia
  - vue
  - typescript
  - eslint
  - laravel pint
  - prettier
description: Some simple steps to format your vue and laravel code and find mistakes faster.
---

![Image 0: Streamlining Your Laravel Inertia Vue Project  with Pint, Prettier, and ESLint.](/posts/laravel-inertia-vue-app-with-eslint-prettier-pint.webp)

# Streamlining Your Laravel Inertia Vue Project  with Pint, Prettier, and ESLint

Many developers face configuration issues when setting up linting tools for their projects. Even after thorough setup, errors from conflicting tools often arise, especially in IDEs without proper configuration.

I'm here to help with my configuration for Laravel, Inertia, and Vue (TypeScript included). This setup is nearly perfect for my current and upcoming projects.

## Backend Steps

Let's start by installing the necessary Composer package.

```bash
composer require laravel/pint --dev
```

This command installs Pint for your Laravel project. Here's the configuration I prefer:

```json
{
  "preset": "laravel",
  "rules": {
    "binary_operator_spaces": {
      "default": "single_space",
      "operators": {
        "=>": "align",
        "=": "align"
      }
    },
    "phpdoc_separation": true,
    "phpdoc_align": {
      "align": "vertical"
    },
    "phpdoc_add_missing_param_annotation": {
      "only_untyped": false
    },
    "psr_autoloading": false
  }
}
```

This setup aims to simplify and speed up your project configuration.

## Frontend Steps

Let's install the necessary npm packages:

```bash
npm install -D eslint eslint-plugin-vue @eslint/js @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-prettier prettier @prettier/plugin-php @shufo/prettier-plugin-blade
```

These packages include some specifically for Blade files, as Laravel Pint does not yet support formatting Blade files, so we use Prettier for that.

Next, create the Prettier configuration file:

```json
{
  "useTabs": true,
  "singleQuote": true,
  "trailingComma": "none",
  "printWidth": 100,
  "tabWidth": 4,
  "singleAttributePerLine": true,
  "plugins": ["@shufo/prettier-plugin-blade"],
  "overrides": [
    {
      "files": ["*.blade.php"],
      "options": {
        "parser": "blade",
        "tabWidth": 4
      }
    }
  ]
}
```

Finally, create the ESLint configuration file:

```js
import prettier from 'eslint-plugin-prettier';
import vue from 'eslint-plugin-vue';
import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...vue.configs['flat/recommended'],
  {
    ignores: ['node_modules/**']
  },
  {
    files: ['**/*.js', '**/*.vue'],
    languageOptions: {
      globals: {
        _: 'readonly',
        route: 'readonly',
        browser: true,
        node: true
      },
      parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
        parser: tsparser
      }
    },
    plugins: {
      prettier
    },
    rules: {
      'vue/html-indent': 'off',
      'prettier/prettier': [
        'error',
        {
          singleAttributePerLine: true
        }
      ],
      'vue/require-default-prop': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: {
            max: 1
          },
          multiline: {
            max: 1
          }
        }
      ]
    }
  }
];
```

With ESLint version 9.5 and above, configuration requirements have changed. If you encounter issues, consult their documentation and compare it with your local version. Some packages may not yet be compatible with ESLint 9.6, so you might need to use `--force` while installing them. These are dev packages and won't affect your production code.

### Formatting Example

Before using ESLint and Prettier:

```html
<template>
 <Card>
  <CardHeader>
   <CardTitle>Delete Account</CardTitle>
   <CardDescription
>
    Once your account is deleted, all of its resources and data will be permanently
    deleted. Before deleting your account, please download any data or information that
    you wish to retain.
   </CardDescription>
  </CardHeader
>
  <CardContent>
   <Button
 variant="destructive"
    @click="confirmUserDeletion"
   >
    Delete Account
   </Button>
  </CardContent>
 </Card>

 <Dialog v-model:open="confirmingUserDeletion">
  <DialogContent 
class="sm:max-w-[425px]">
   <DialogHeader
>
    <DialogTitle>
     <h2 
class="text-lg font-medium text-gray-900 dark:text-gray-100">
      Delete Account
     </h2>
    </DialogTitle>
    <DialogDescription>
     <p 
class="mt-1 text-sm text-gray-600 dark:text-gray-400">
      Once your account is deleted, all of its resources and data will be
      permanently deleted. Before deleting your account, please download any data
      or information that you wish to retain.
     </p>
    </DialogDescription>
   </DialogHeader>
   <div>
    <Label
     for="password"
   class="text-right"
    >
     Password
    </Label>
    <Input
     id="password"
   v-model="form.password"
     ref="passwordInput"
     class="col-span-3"
     type="password"
     required
     @keyup.enter="deleteUser"
     :error="form.errors.password"
    />
   </div>
   <div class="mt-6 flex justify-end">
    <Button
     variant="outline"
     @click="closeModal"
    >
     Cancel
    </Button>
    <Button
     variant="destructive"
   class="ms-3"
     :class="{ 'opacity-25': form.processing }"
     :disabled="form.processing"
     @click="deleteUser"
    >
     Delete Account
    </Button>
   </div>
  </DialogContent>
 </Dialog>
</template>

<script setup lang="ts">
import { nextTick, Ref, ref, watchEffect } from 'vue';
import { useForm } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
 Dialog,
 DialogContent,
 DialogHeader,
 DialogTitle,
 DialogDescription
} from '@/components/ui/dialog';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const confirmingUserDeletion = ref(false);

const passwordInput: Ref<HTMLInputElement | undefined> = ref();

const form = useForm({
 password: ''
});

watchEffect(() => {
 if (!confirmingUserDeletion.value) {
  form.reset();
 }
});

const confirmUserDeletion = async () => {
 confirmingUserDeletion.value = true;
 await nextTick();
 passwordInput.value?.focus();
};

const deleteUser = () => {
 form.delete(route('profile.destroy'), {
  data: { password: form.password },
  preserveScroll: true,
  onSuccess: closeModal,
  onError: () => passwordInput.value?.focus(),
  onFinish: () => form.reset()
 });
};

const closeModal = () => {
 confirmingUserDeletion.value = false;
};
</script>
```

After formatting:

```html
<template>
 <Card>
  <CardHeader>
   <CardTitle>Delete Account</CardTitle>
   <CardDescription>
    Once your account is deleted, all of its resources and data will be permanently
    deleted. Before deleting your account, please download any data or information that
    you wish to retain.
   </CardDescription>
  </CardHeader>
  <CardContent>
   <Button
    variant="destructive"
    @click="confirmUserDeletion"
   >
    Delete Account
   </Button>
  </CardContent>
 </Card>

 <Dialog v-model:open="confirmingUserDeletion">
  <DialogContent class="sm:max-w-[425px]">
   <DialogHeader>
    <DialogTitle>
     <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
      Delete Account
     </h2>
    </DialogTitle>
    <DialogDescription>
     <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
      Once your account is deleted, all of its resources and data will be
      permanently deleted. Before deleting your account, please download any data
      or information that you wish to retain.
     </p>
    </DialogDescription>
   </DialogHeader>
   <div>
    <Label
     for="password"
     class="text-right"
    >
     Password
    </Label>
    <Input
     id="password"
     v-model="form.password"
     ref="passwordInput"
     class="col-span-3"
     type="password"
     required
     @keyup.enter="deleteUser"
     :error="form.errors.password"
    />
   </div>
   <div class="mt-6 flex justify-end">
    <Button
     variant="outline"
     @click="closeModal"
    >
     Cancel
    </Button>
    <Button
     variant="destructive"
     class="ms-3"
     :class="{ 'opacity-25': form.processing }"
     :disabled="form

.processing"
     @click="deleteUser"
    >
     Delete Account
    </Button>
   </div>
  </DialogContent>
 </Dialog>
</template>

<script setup lang="ts">
import { nextTick, Ref, ref, watchEffect } from 'vue';
import { useForm } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
 Dialog,
 DialogContent,
 DialogHeader,
 DialogTitle,
 DialogDescription
} from '@/components/ui/dialog';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const confirmingUserDeletion = ref(false);

const passwordInput: Ref<HTMLInputElement | undefined> = ref();

const form = useForm({
 password: ''
});

watchEffect(() => {
 if (!confirmingUserDeletion.value) {
  form.reset();
 }
});

const confirmUserDeletion = async () => {
 confirmingUserDeletion.value = true;
 await nextTick();
 passwordInput.value?.focus();
};

const deleteUser = () => {
 form.delete(route('profile.destroy'), {
  data: { password: form.password },
  preserveScroll: true,
  onSuccess: closeModal,
  onError: () => passwordInput.value?.focus(),
  onFinish: () => form.reset()
 });
};

const closeModal = () => {
 confirmingUserDeletion.value = false;
};
</script>
```

### Additional Configuration

Add the following line to your `package.json` scripts:

```json
"format": "prettier . --write"
```

Now, you can format your files by running:

```bash
npm run format
```

This setup should make formatting your files easier and help you avoid merge conflicts. Try integrating it with your IDE for an even smoother experience.

Thanks for reading! I hope this guide helps you have a more efficient and enjoyable coding experience. Have a great day!
