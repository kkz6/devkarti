---
pubDatetime: 2024-04-30T00:00:00Z
modDatetime: 2024-04-30T00:00:00Z
title: Building APIs with Laravel even faster.
slug: building-apis-with-laravel-even-faster
featured: false
draft: false
tags:
  - laravel
  - api
  - boilerplate
description: Some simple steps to make building of an laravel api much faster than ever.
---

![Image 0: Building APIs with Laravel even faster.](/posts/API-Laravel-boilerplate.webp)

## Building APIs with Laravel even faster

_Laravel_ is now quite a popular framework and its trending even more after the release of version 11. If you are planning to build an api for your **mobile app** or an **web-app** still there are so many things that you are needed to consider.

In this post let’s see how we can create a single api endpoint eg. customer which can all the basic things that are needed.

_Laravel_ already has an artisan command to do this. Running a single command with create an entire list of files that you need to start with creating an endpoint.

```php
php artisan make:model Customer --all --api
```

This will create a model, Factory, Create and Update Request, Controller and a policy as well. But even after this let’s say if you want to store the data to the model you need to update the code every time when you run this command.

Here we are going to find a workaround for this and make things faster.

## Modifying _Laravel_ Stubs

You might have already known that in Laravel all the files that are generated using commands are basically dependent on the files called stubs. These files have like basic framework of how the files needs to have a generate code when they are ready to be integrated.

If you wish to see all the stubs files that are available in Laravel you can run

```php
$ php artisan stub:publish
$ git add stubs
$ git status
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)
 
    new file:   stubs/cast.stub
    new file:   stubs/console.stub
    new file:   stubs/controller.api.stub
    new file:   stubs/controller.invokable.stub
    new file:   stubs/controller.model.api.stub
    new file:   stubs/controller.model.stub
    new file:   stubs/controller.nested.api.stub
    new file:   stubs/controller.nested.stub
    new file:   stubs/controller.plain.stub
    new file:   stubs/controller.stub
    new file:   stubs/factory.stub
    new file:   stubs/job.queued.stub
    new file:   stubs/job.stub
    new file:   stubs/middleware.stub
    new file:   stubs/migration.create.stub
    new file:   stubs/migration.stub
    new file:   stubs/migration.update.stub
    new file:   stubs/model.pivot.stub
    new file:   stubs/model.stub
    new file:   stubs/observer.plain.stub
    new file:   stubs/observer.stub
    new file:   stubs/policy.plain.stub
    new file:   stubs/policy.stub
    new file:   stubs/request.stub
    new file:   stubs/resource-collection.stub
    new file:   stubs/resource.stub
    new file:   stubs/rule.stub
    new file:   stubs/seeder.stub
    new file:   stubs/test.stub
    new file:   stubs/test.unit.stub

```

You can add any kind of modifications to this to add the modified change whenever you run an _artisan make_ command.

Our goal here is not to modify the entire stubs. But start with some basic changes which can speed up the entire process.

Here in this post we are going to modify only the **stubs/controller.model.api.stub**.

We are going to add functionalities like pagination for the index route and all other basic CRUD actions.

To implement pagination in the index api we will use [**Spatie’s _Query Builder_**](https://spatie.be/docs/laravel-query-builder/v5/installation-setup) Library.

So to install it use the composer command.

```php
composer require spatie/laravel-query-builder
```

Now let’s modify the **controller.model.api.stub** file to have pagination with query builder automatically.

```php
<?php

namespace {{ namespace }};

use {{ namespacedModel }};
use {{ rootNamespace }}Http\Controllers\Controller;
use {{ namespacedRequests }}
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Spatie\QueryBuilder\QueryBuilder;


class {{ class }} extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $model = QueryBuilder::for({{ model }}::class)
            ->allowedSorts(['id', 'created_at']);

        return response()->json($model->paginate(perPage: $request->perPage()));

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store({{ storeRequest }} $request): JsonResponse
    {
        return response()->json({{ model }}::create($request->validated()));
    }

    /**
     * Display the specified resource.
     */
    public function show({{ model }} ${{ modelVariable }}): JsonResponse
    {
        return response()->json(${{ modelVariable }});
    }

    /**
     * Update the specified resource in storage.
     */
    public function update({{ updateRequest }} $request, {{ model }} ${{ modelVariable }}): JsonResponse
    {
        $data = tap(${{ modelVariable }},fn($model) => $model->update($request->validated()));
        return response()->json($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy({{ model }} ${{ modelVariable }}):JsonResponse
    {
        ${{ modelVariable }}->delete();

        return response()->json('Item deleted');
    }
}


```

### Output

Now when you run the composer command

```php
php artisan make:model Customer --all --api
```

The controller output would be something like

```php
<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use App\Models\Customer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $model = QueryBuilder::for(Customer::class)
            ->allowedSorts(['id', 'created_at']);

        return response()->json($model->paginate(perPage: $request->perPage()));

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCustomerRequest $request): JsonResponse
    {
        return response()->json(Customer::create($request->validated()));
    }

    /**
     * Display the specified resource.
     */
    public function show(Customer $customer): JsonResponse
    {
        return response()->json($customer);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCustomerRequest $request, Customer $customer): JsonResponse
    {
        $data = tap($customer,fn($model) => $model->update($request->validated()));
        return response()->json($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $customer):JsonResponse
    {
        $customer->delete();

        return response()->json('Item deleted');
    }
}


```

### Bonus Tips

If you see the above code I have added something like `$request->perPage()` which is not available by default in _Laravel_. This can be added by using something called [macros](https://laravel.com/api/9.x/Illuminate/Support/Traits/Macroable.html).

In our code we are going to add this macro for **Request** Class in _Laravel_

```php

/**
 * So we can consistently get a perPage value from data tables.
 *
 * @param int|null|string $default = null This should only be provided as 'all' if a string is given
 *
 * @return callable|int|null|string
 */
Request::macro(
    name: 'perPage',
    macro: function (int|null|string $default = null) {
        /** @var Request $this */
        $perPage = $this->get('perPage');

        /**
         * If we provide a default value which isn't valid we should convert to null to prevent errors
         * This is any value which is a string but not all.
         */
        $default = is_string($default) && $default !== 'all'
            ? null
            : $default;

        /**
         * The eloquent builder paginate method accepts `int|null|\Closure`
         * It already calculates the total number of records before generating the links
         * So to get an accurate 'all' pagination option we should return a callback which will be passed that total.
         *
         * @see \Illuminate\Database\Eloquent\Builder
         */
        if ($perPage === 'all') {
            return fn (int $total) => $total;
        }

        //If the perPage value is an integer at this point we should use it otherwise provide the default
        //Casting a non-int will return 0 and we should also not accept 0 items per page
        //as providing a non-integer or non-null value here would cause an exception
        return (int) $this->get('perPage') !== 0
            ? $this->get('perPage')
            : $default;
    }
);


```

Add this to your boot method of your **AppServiceProvider** in _Laravel_. The code itself looks kind of self explanatory. So have a look and play around with the code.

Don’t forget to add the import of `use Illuminate\Http\Request;` in the top of AppServiceProvider.

That’s all. This is a very basic example of how we can add speed up building an API by modifying just only one file.

I will be sharing more changes to this code idea in the repo [Laravel API Boilerplate](https://github.com/kkz6/laravel-actions-api-boilerplate) which you can fork anytime and use for your project.

PS: Image Courtesy - ChatGPT
