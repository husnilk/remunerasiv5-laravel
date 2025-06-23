<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Foundation\Vite; // Import the class to mock
use Mockery; // Import Mockery

abstract class TestCase extends BaseTestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        // Mock Vite to prevent manifest loading issues in tests
        $this->mock(Vite::class, function ($mock) {
            $mock->shouldReceive('useHotFile')->andReturnSelf();
            $mock->shouldReceive('useBuildDirectory')->andReturnSelf();
            $mock->shouldReceive('withEntryPoints')->andReturnSelf();
            $mock->shouldReceive('createAssetPathsUsing')->andReturnSelf();
            $mock->shouldReceive('preloadedAssets')->andReturnNull(); // Handle preloadedAssets
            // Add any other methods called by your app's views if necessary
            // For basic Inertia rendering, the __invoke method is often called.
            $mock->shouldReceive('__invoke')->andReturn('');
        });
    }

    protected function tearDown(): void
    {
        Mockery::close(); // Important for Mockery integration with PHPUnit
        parent::tearDown();
    }
}
