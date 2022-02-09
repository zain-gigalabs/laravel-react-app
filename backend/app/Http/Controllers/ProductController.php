<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    //
    function addProduct(Request $request)
    {
        $product = new Product();
        $product->name = $request->name;
        $product->price = $request->price;
        $product->description = $request->description;
        $product->file_path = $request->file('file')->store('public/images');
        $product->save();
        return $product;
    }

    function list()
    {
        return Product::all();
    }

    function delete($id)
    {
        $result = Product::where('id', $id)->delete();
        if ($result) {
            return ["result" => "Product deleted successfully"];
        } else {
            return ["result" => "Product deleted failed"];
        }
    }

    function getProduct($id)
    {
        $product = Product::find($id);

        if ($product) {
            return ["product" => $product];
        } else {
            return ["product" => "Product not found"];
        }
    }

    function updateProduct($id, Request $request)
    {
        $product = Product::find($id);
        $product->name = $request->name;
        $product->price = $request->price;
        $product->description = $request->description;
        if ($request->file())
            $product->file_path = $request->file('file')->store('public/images');
        $product->save();
        return $product;
    }

    function search($key)
    {
        return Product::where("name" , "LIKE" , "%".$key."%")->get();
    }
}
