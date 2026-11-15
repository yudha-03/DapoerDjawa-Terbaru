'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

import { useAuth } from '@/lib/auth-context';
import { addToLocalCart } from '@/lib/cart-store';
import { toast } from '@/components/ui/toast';
import { useConfirm } from '@/components/ui/ConfirmDialog';
import { useCartModal } from '@/components/ui/AddToCartModal';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ProductInfo, { ProductDisplay, ProductVariant } from './ProductInfo';
import RelatedProducts, { FpGrowthProduct, RelatedProduct } from './RelatedProducts';
import ReviewSection, { Review } from './ReviewSection';

interface DetailClientProps {
  product: ProductDisplay;
  initialReviews: Review[];
  fpGrowthProducts: FpGrowthProduct[];
  fallbackProducts: RelatedProduct[];
  recommendationSource: string;
}

export default function DetailClient({ product, initialReviews, fpGrowthProducts, fallbackProducts, recommendationSource }: DetailClientProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const confirm = useConfirm();
  const showCartModal = useCartModal();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(product?.variants?.[0] || null);
  const [qty, setQty] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [reviewVariantId, setReviewVariantId] = useState<string>(product?.variants?.[0]?.id || '');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const { user } = useAuth();
  const currentUser = user ? { id: user.id, nama_user: user.nama_user, email: user.email, role: user.role } : null;

  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);

  const handleAddToCart = async () => {
    if (qty === 0) return toast.add({ type: 'error', title: 'Tentukan jumlah barang dulu ya' });
    if (!selectedVariant) return toast.add({ type: 'error', title: 'Silakan pilih varian produk' });

    const batasStok = (selectedVariant as ProductVariant & { stok?: number }).stok || 0;

    if (batasStok === 0) {
      return toast.add({ type: 'error', title: 'Stok untuk ukuran ini sedang kosong' });
    }
    if (qty > batasStok) {
      return toast.add({ type: 'error', title: `Stok tersisa hanya ${batasStok} pcs` });
    }
    if (!currentUser) {
      const goLogin = await confirm({
        title: 'Belum Login',
        description: 'Silakan login terlebih dahulu untuk menambahkan produk ke keranjang.',
        confirmLabel: 'Login',
        cancelLabel: 'Nanti',
      });
      if (goLogin) router.push('/login');
      return;
    }

    setIsAddingToCart(true);
    try {
      addToLocalCart(selectedVariant.id, qty);
      await queryClient.invalidateQueries({ queryKey: ['cart'] });
      await queryClient.invalidateQueries({ queryKey: ['cartCount'] });
      showCartModal({
        productName: product.nama_produk,
        variant: selectedVariant.ukuran || 'Reguler',
        qty,
        price: Number(selectedVariant.price),
        image: selectedVariant.img || product.variants?.[0]?.img || '/placeholder.jpg',
      });
      setQty(1);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Terjadi kesalahan yang tidak diketahui.';
      toast.add({ type: 'error', title: message });
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !reviewVariantId || !newComment.trim()) return;

    setIsSubmittingReview(true);
    try {
      const newRev: Review = {
        id: `rev-${Date.now()}`,
        produk_id: product.id,
        varian_id: reviewVariantId,
        user_id: currentUser.id,
        user_name: currentUser.nama_user,
        rating: newRating,
        comment: newComment.trim(),
        created_at: new Date().toISOString(),
      };
      setReviews((current) => [newRev, ...current]);
      setNewComment('');
      setNewRating(5);
      toast.add({ type: 'success', title: 'Ulasan berhasil dikirim' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Terjadi kesalahan saat mengirim ulasan.';
      toast.add({ type: 'error', title: message });
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const handleSubmitReply = async (reviewId: string) => {
    const text = replyText.trim();
    if (!text) return;
    if (!currentUser) return toast.add({ type: 'error', title: 'Silakan login terlebih dahulu' });
    if (currentUser.role !== 'admin' && currentUser.role !== 'owner') {
      return toast.add({ type: 'error', title: 'Anda tidak memiliki akses' });
    }

    setIsSubmittingReply(true);
    try {
      setReviews((current) => current.map((review) => (review.id === reviewId ? { ...review, reply: text } : review)));
      setReplyText('');
      setReplyingTo(null);
      toast.add({ type: 'success', title: 'Balasan berhasil disimpan' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Gagal menyimpan balasan.';
      toast.add({ type: 'error', title: message });
    } finally {
      setIsSubmittingReply(false);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    const confirmed = await confirm({
      title: 'Hapus Ulasan?',
      description: 'Tindakan ini tidak bisa dibatalkan.',
      confirmLabel: 'Hapus',
      variant: 'danger',
    });
    if (!confirmed) return;

    try {
      setReviews((current) => current.filter((review) => review.id !== reviewId));
      toast.add({ type: 'success', title: 'Ulasan berhasil dihapus' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Gagal menghapus ulasan.';
      toast.add({ type: 'error', title: message });
    }
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
    : '0';

  const hasReviewedCurrentVariant = reviews.some(
    (review) => review.user_id === currentUser?.id && review.varian_id === reviewVariantId
  );

  return (
    <>
      <Breadcrumbs items={[
        { label: 'Produk', href: '/#shop' },
        { label: product.nama_produk },
      ]} />
      <ProductInfo
        product={product}
        selectedVariant={selectedVariant}
        setSelectedVariant={setSelectedVariant}
        setReviewVariantId={setReviewVariantId}
        qty={qty}
        setQty={setQty}
        isAddingToCart={isAddingToCart}
        handleAddToCart={handleAddToCart}
        averageRating={averageRating}
        reviewCount={reviews.length}
      />
      <hr className="mb-16 border-gray-100" />
      <ReviewSection
        currentUser={currentUser}
        product={product}
        reviews={reviews}
        reviewVariantId={reviewVariantId}
        setReviewVariantId={setReviewVariantId}
        hasReviewedCurrentVariant={hasReviewedCurrentVariant}
        newRating={newRating}
        setNewRating={setNewRating}
        newComment={newComment}
        setNewComment={setNewComment}
        isSubmittingReview={isSubmittingReview}
        handleSubmitReview={handleSubmitReview}
        handleDeleteReview={handleDeleteReview}
        replyingTo={replyingTo}
        setReplyingTo={setReplyingTo}
        replyText={replyText}
        setReplyText={setReplyText}
        handleSubmitReply={handleSubmitReply}
        isSubmittingReply={isSubmittingReply}
      />
      <RelatedProducts
        fpGrowthProducts={fpGrowthProducts}
        fallbackProducts={fallbackProducts}
        recommendationSource={recommendationSource}
        currentProductName={product.nama_produk}
      />
    </>
  );
}
