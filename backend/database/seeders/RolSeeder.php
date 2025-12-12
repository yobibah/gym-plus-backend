<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::firstOrCreate(['name' => 'Adherant','guard_name'=>'api']);
        Role::firstOrCreate(['name' => 'Gerant','guard_name'=>'api']);
        Role::firstOrCreate(['name' => 'Employe','guard_name'=>'api']);
        Role::firstOrCreate(['name' => 'Admin','guard_name'=>'api']);
        Role::firstOrCreate(['name' => 'SuperAdmin','guard_name'=>'api']);
    }
}
