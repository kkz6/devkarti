---
pubDatetime: 2024-05-08T00:00:00Z
modDatetime: 2024-05-08T00:00:00Z
title: Laravel Pipelines in Action.
slug: laravel-pipelines-in-action
featured: false
draft: false
tags:
  - laravel
  - pipelines
  - rxjs
  - api
description: Some simple steps to implement laravel pipelines in your code.
---

![Image 0: Laravel Pipelines in Actions.](/posts/laravel-pipes.webp)

# Laravel Pipelines in Actions

Laravel Pipelines have improved a lot recently. Pipeline class is implemented based on the Chain of Responsibility (aka CoR) design pattern and …. Just kidding this is not a blog post to explain what is pipeline. You can google it and understand it more. This is Laravel Pipelines in action.

## Project goal.

To understand pipelines easier we are going to create a simple yet it can become a complex example based on how you take it further.

If you have seen in my [previous post](https://www.devkarti.com/posts/building-apis-with-laravel-even-faster/) where I have used [query builder from Spatie](https://spatie.be/docs/laravel-query-builder/v5/introduction) to adding sorting and filtering to the response. Now in this project, we are going to do it manually. This is just an example. You can understand the concept and make modifications as much as you want.

This is how my previous code looks like when we are using Query Builder.

```php
public function index(Request $request): JsonResponse
    {
        $model = QueryBuilder::for({{ model }}::class)
            ->allowedSorts(['id', 'created_at']);

        return response()->json($model->paginate(perPage: $request->perPage()));

    }
```

Now we are going to modify the code to use something like scopes in Laravel but with pipeline.

Features we are going to implement here are.

- Query sorting
- Filtering.
- Pagination.

Once we have done implementing I will share some other ideas where you can use it. But now let’s focus on the code.

## The Code.

Let’s start modifying the code in the controller first.

```php
public function index(Request $request)
{
    return Pipeline::send(User::query())
        ->through([
            //All the pipe we are going to add it below.

        ])
        ->thenReturn()
        ->paginate(perPage: $request->perPage());
}

```

In this code kindly note that we are also using macros for Request class. The details are available in my [previous post](https://www.devkarti.com/posts/building-apis-with-laravel-even-faster/#bonus-tips). Also, The pagination part for the code here is already implemented.

Laravel or any framework can be modified in any format you want. But here to make the code even more readable and understand I am following a way which is good for me. Feel free to modify it any other way you want.

### Let’s start with Sorting.

Let's Create a folder inside the **app** directory and name it as **QueryFilters**

Create a class named **Sort** . The final code would look something like this.

```php

/// Sort Filter

<?php

namespace App\QueryFilters;

class Sort
{
    public function handle($request, \Closure $next)
    {
        $builder = $next($request);

        return $builder->when(request()->has('sort'), fn ($query) => $query->orderBy('name', request('sort')));
    }
}

/// Active Filter
// Considering you already have a column active in users table with a boolean value.
<?php

namespace App\QueryFilters;

class Active
{
    public function handle($request, \Closure $next)
    {
        $builder = $next($request);

        return $builder->when(request()->has('active'), fn ($query) => $query->where('active', request('active')));
    }
}



```

Finally, you update your index method to add the query filters to the pipelines.

```php

<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\QueryFilters\Active;
use App\QueryFilters\Sort;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Pipeline;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Pipeline::send(User::query())
            ->through([
                //All the pipe we are going to add it below.
                Sort::class,
                Active::class
            ])
            ->thenReturn()
            ->paginate(perPage: $request->perPage());
    }

}
```

That’s all. This is pipelines. We have added sorting and active columns based filtering to the code. In the Query Filters it is necessary you need to add the code in the handle method. Coz Laravel is designed in that way. Based on this code you might have seen a class with handle method already somewhere else right ?. Try to remember it.

Yes, Exactly, the Laravel Middleware. The entire Laravel middleware works with the strategy. You can dig around the code to understand more about them.

This blog post is to share a basic idea on how to work with Laravel pipelines. My intention is not to explain more on how it works because there are so many posts explaining it. May be I will add some references below.

### Refactoring.

Since you have implemented the query filters already let’s refactor the code even more.

Let us start by creating an abstract class named **Filter**

```php
<?php

namespace App\QueryFilters;

use Illuminate\Database\Query\Builder;
use Illuminate\Support\Str;

abstract class Filter
{
    /**
     * Handle method where laravel sends all the responses.
     * @param $request
     * @param \Closure $next
     * @return Builder|mixed
     */
    public function handle($request, \Closure $next): mixed
    {
        if (request()->has($this->filterName())) {
            return $next($request);
        }

        $builder = $next($request);

        return $this->applyFilters($builder);
    }

    protected abstract function applyFilters(Builder $builder): Builder;

    /**
     * Returns the current class name in snake case format.
     * @return string
     */
    protected function filterName(): string
    {
        return Str::snake(class_basename($this));
    }
}

```

And now let us apply the abstract class to other classes and thus the modified code will be like

```php

///Active Filter
<?php

namespace App\QueryFilters;

use Illuminate\Database\Query\Builder;

class Active extends Filter
{
    protected function applyFilters(Builder $builder): Builder
    {
        return $builder->where('active', request($this->filterName()));
    }
}

///Sort Filter

<?php

namespace App\QueryFilters;

use Illuminate\Database\Query\Builder;

class Sort extends Filter
{
    protected function applyFilters(Builder $builder): Builder
    {
        return $builder->orderBy('name', request($this->filterName()));
    }
}

```

And nothing needs to be changed in the controller. This content is truly inspired from **Coder’s Tape YouTube channel**.

That’s all, Thanks for reading. Have a great day ahead.

Reference links for pipelines:

- [Laravel Pipelines Guide: Simplify Coding Processes](https://wpwebinfotech.com/blog/laravel-pipelines/)
- [Blog for Laravel Artisans](https://martinjoo.dev/laravel-pipelines)
- [Build sequences with Laravel pipelines](https://kirschbaumdevelopment.com/insights/build-sequences-with-laravel-pipelines)

PS: Image Courtesy - ChatGPT
