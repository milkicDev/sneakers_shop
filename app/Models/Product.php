<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model {
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'shortDesc',
        'description'
    ];

    /** @return BelongsToMany */
    public function images() {
        // Get images from DB
        return $this->hasMany(\App\Models\ProductImage::class, 'product_id');
    }
}
