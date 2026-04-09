import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useAddProduct, useUpdateProduct } from "@/hooks/useProducts";
import type { Product } from "@/types";
import { ImagePlus, Loader2, Upload, X } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

const CATEGORIES = ["Accessories", "Apparel", "Beauty", "Bags", "Home", "Tech"];
const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

interface ProductFormProps {
  product?: Product;
  onClose: () => void;
}

export function ProductForm({ product, onClose }: ProductFormProps) {
  const isEdit = !!product;
  const addProduct = useAddProduct();
  const updateProduct = useUpdateProduct();

  const [name, setName] = useState(product?.name ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [price, setPrice] = useState(String(product?.price ?? ""));
  const [comparePrice, setComparePrice] = useState(
    String(product?.comparePrice ?? ""),
  );
  const [category, setCategory] = useState(product?.category ?? "");
  const [stock, setStock] = useState(String(product?.stock ?? ""));
  const [colors, setColors] = useState((product?.colors ?? []).join(", "));
  const [selectedSizes, setSelectedSizes] = useState<string[]>(
    product?.sizes ?? [],
  );
  const [featured, setFeatured] = useState(product?.featured ?? false);
  const [images, setImages] = useState<string[]>(product?.images ?? []);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };

  const simulateUpload = useCallback(async (files: FileList | File[]) => {
    setUploading(true);
    await new Promise((r) => setTimeout(r, 900));
    const urls = Array.from(files).map(
      (f) => `/assets/generated/product-${Date.now()}-${f.name}`,
    );
    setImages((prev) => [...prev, ...urls]);
    setUploading(false);
    toast.success(`${files.length} image(s) uploaded`);
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length) simulateUpload(e.dataTransfer.files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) simulateUpload(e.target.files);
  };

  const removeImage = (url: string) =>
    setImages((prev) => prev.filter((img) => img !== url));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !category || !price) {
      toast.error("Please fill all required fields");
      return;
    }
    setSaving(true);
    const payload = {
      name,
      description,
      price: Number(price),
      comparePrice: comparePrice ? Number(comparePrice) : undefined,
      category,
      stock: Number(stock) || 0,
      colors: colors
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
      sizes: selectedSizes.length ? selectedSizes : undefined,
      featured,
      images: images.length ? images : ["/assets/images/placeholder.svg"],
      tags: [category.toLowerCase()],
    };
    try {
      if (isEdit) {
        await updateProduct.mutateAsync({ id: product.id, updates: payload });
        toast.success("Product updated");
      } else {
        await addProduct.mutateAsync(payload);
        toast.success("Product added");
      }
      onClose();
    } catch {
      toast.error("Operation failed — backend not yet connected");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Image upload */}
      <div>
        <Label className="mb-2 block">Product Images</Label>
        <div
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          data-ocid="product-image-dropzone"
          className={`border-2 border-dashed rounded-xl p-6 text-center transition-smooth cursor-pointer
            ${dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
          onClick={() => document.getElementById("img-upload")?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ")
              document.getElementById("img-upload")?.click();
          }}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Loader2 size={28} className="animate-spin" />
              <p className="text-sm">Uploading…</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <ImagePlus size={28} />
              <p className="text-sm">
                Drag & drop images, or{" "}
                <span className="text-primary font-medium">browse</span>
              </p>
              <p className="text-xs">PNG, JPG, WebP up to 10MB</p>
            </div>
          )}
          <input
            id="img-upload"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileInput}
          />
        </div>
        {images.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {images.map((url) => (
              <div key={url} className="relative group w-16 h-16">
                <img
                  src={url}
                  alt="product"
                  className="w-full h-full object-cover rounded-lg border border-border"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/assets/images/placeholder.svg";
                  }}
                />
                <button
                  type="button"
                  onClick={() => removeImage(url)}
                  className="absolute -top-1.5 -right-1.5 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-smooth"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Name & Price */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="pf-name">Name *</Label>
          <Input
            id="pf-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product name"
            data-ocid="product-name-input"
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="pf-category">Category *</Label>
          <Select value={category} onValueChange={setCategory} required>
            <SelectTrigger id="pf-category" data-ocid="product-category-select">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="pf-desc">Description</Label>
        <Textarea
          id="pf-desc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Product description…"
          rows={3}
          data-ocid="product-description-input"
        />
      </div>

      {/* Price & Stock */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="pf-price">Price ($) *</Label>
          <Input
            id="pf-price"
            type="number"
            min={0}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.00"
            data-ocid="product-price-input"
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="pf-compare">Compare Price ($)</Label>
          <Input
            id="pf-compare"
            type="number"
            min={0}
            value={comparePrice}
            onChange={(e) => setComparePrice(e.target.value)}
            placeholder="0.00"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="pf-stock">Stock</Label>
          <Input
            id="pf-stock"
            type="number"
            min={0}
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="0"
            data-ocid="product-stock-input"
          />
        </div>
      </div>

      {/* Colors */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="pf-colors">Colors (comma-separated)</Label>
        <Input
          id="pf-colors"
          value={colors}
          onChange={(e) => setColors(e.target.value)}
          placeholder="Midnight Black, Rose Gold…"
        />
      </div>

      {/* Sizes */}
      <div className="flex flex-col gap-2">
        <Label>Sizes</Label>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => toggleSize(s)}
              data-ocid={`size-toggle-${s.toLowerCase()}`}
              className={`px-3 py-1 rounded-lg text-sm font-medium border transition-smooth
                ${selectedSizes.includes(s) ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Featured */}
      <div className="flex items-center gap-3">
        <Switch
          id="pf-featured"
          checked={featured}
          onCheckedChange={setFeatured}
          data-ocid="product-featured-toggle"
        />
        <Label htmlFor="pf-featured">Featured product</Label>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2 justify-end border-t border-border">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          data-ocid="product-form-cancel"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={saving}
          data-ocid="product-form-submit"
          className="gap-2"
        >
          {saving ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Upload size={16} />
          )}
          {isEdit ? "Save Changes" : "Add Product"}
        </Button>
      </div>
    </form>
  );
}
