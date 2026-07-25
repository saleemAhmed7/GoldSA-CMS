export type Language = "ar" | "tr" | "en";

export interface TranslationDictionary {
  // Navigation & Shell
  workspace: string;
  operationsControlRoom: string;
  adminSubtitle: string;
  dashboard: string;
  catalog: string;
  media: string;
  settings: string;
  live: string;
  liveGoldMarketRates: string;
  perGram: string;
  gold24k: string;
  gold22k: string;
  gold18k: string;

  // Time Ranges
  today: string;
  days7: string;
  days30: string;
  ytd: string;

  // Actions
  refreshRates: string;
  quickActions: string;
  quickActionsDesc: string;
  addNewJewelry: string;
  updateGoldRates: string;
  fulfillOrders: string;
  uploadCertificate: string;
  exportReport: string;

  // KPIs
  totalSalesRevenue: string;
  vsPreviousMonth: string;
  activeOpenOrders: string;
  inFulfillmentQueue: string;
  pendingPaymentVerification: string;
  catalogInventory: string;
  activeJewelryItems: string;
  goldWeightSummary: string;
  lowStockAlerts: string;
  itemsNeedReorder: string;

  // Charts
  salesRevenueTrend: string;
  monthlyRevenueBreakdown: string;
  revenueByKrat: string;
  goldPuritySales: string;
  customOrders: string;
  standardCatalog: string;
  peak: string;
  bangleInsight: string;

  // Summaries
  fulfillmentLifecycle: string;
  orderProgression: string;
  inventoryHealth: string;
  stockLevelsAndWarnings: string;
  actionItems: string;

  // Orders Table
  recentOrders: string;
  recentOrdersDesc: string;
  orderId: string;
  customer: string;
  jewelryItems: string;
  totalAmount: string;
  orderStatus: string;
  paymentStatus: string;
  date: string;
  action: string;
  viewDetails: string;
  generateInvoice: string;
  updateStatus: string;

  // Top Products
  topPerformingJewelry: string;
  topPerformingDesc: string;
  sold: string;
  outOfStock: string;

  // Timeline
  recentActivityLedger: string;
  auditTrailDesc: string;

  // Dev preview
  statePreview: string;
  testConditions: string;
  normalView: string;
  loadingSkeleton: string;
  emptyState: string;
  noDataTitle: string;
  noDataDesc: string;
  returnToNormal: string;
}

export const translations: Record<Language, TranslationDictionary> = {
  ar: {
    workspace: "مساحة عمل الإدارة",
    operationsControlRoom: "غرفة التحكم والعمليات",
    adminSubtitle: "إدارة مباشرة لإكتفاء المجوهرات، أسعار الذهب، وطلبات العملاء.",
    dashboard: "لوحة التحكم",
    catalog: "الكتالوج والمجوهرات",
    media: "مكتبة الوسائط",
    settings: "الإعدادات العامة",
    live: "مباشر",
    liveGoldMarketRates: "أسعار الذهب المباشرة (ريال / جرام)",
    perGram: "جرام",
    gold24k: "ذهب عيار 24",
    gold22k: "ذهب عيار 22",
    gold18k: "ذهب عيار 18",

    today: "اليوم",
    days7: "7 أيام",
    days30: "30 يوماً",
    ytd: "منذ بداية العام",

    refreshRates: "تحديث الأسعار",
    quickActions: "إجراءات سريعة للمشغل",
    quickActionsDesc: "مهام الإدارة الأكثر استخداماً",
    addNewJewelry: "+ إضافة قطعة مجوهرات",
    updateGoldRates: "تحديث أسعار الذهب",
    fulfillOrders: "معالجة الطلبات المعلقة",
    uploadCertificate: "رفع شهادة GIA",
    exportReport: "تصدير التقرير",

    totalSalesRevenue: "إجمالي إيرادات المبيعات",
    vsPreviousMonth: "مقارنة بالشهر السابق",
    activeOpenOrders: "الطلبات النشطة المعلقة",
    inFulfillmentQueue: "في قائمة التنفيذ",
    pendingPaymentVerification: "بانتظار تأكيد الدفع",
    catalogInventory: "المخزون المسجل",
    activeJewelryItems: "قطعة مجوهرات نشطة",
    goldWeightSummary: "إجمالي وزن الذهب",
    lowStockAlerts: "تنبيهات انخفاض المخزون",
    itemsNeedReorder: "قطع تتطلب إعادة الطلب",

    salesRevenueTrend: "مؤشر نمو المبيعات الإجمالي",
    monthlyRevenueBreakdown: "توزيع الإيرادات بين الطلبات الخاصة والكتالوج",
    revenueByKrat: "الإيرادات حسب عيار الذهب",
    goldPuritySales: "نسبة مبيعات النقاء والعيارات",
    customOrders: "طلبات تفصيل خاصة",
    standardCatalog: "كتالوج الجاهز",
    peak: "أعلى ذروة",
    bangleInsight: "💡 أطقم الأساور عيار 22 تصدرت أعلى نسبة مبيعات هذا الشهر.",

    fulfillmentLifecycle: "مراحل تنفيذ الطلبات",
    orderProgression: "متابعة مسار الطلبات الحالية",
    inventoryHealth: "سلامة المخزون والحد الأدنى",
    stockLevelsAndWarnings: "مستويات المخزون وتحذيرات النقص",
    actionItems: "تنبيهات تتطلب إجراء",

    recentOrders: "أحدث الطلبات",
    recentOrdersDesc: "قائمة الشراء الأخيرة وحالات الدفع والتوصيل",
    orderId: "رقم الطلب",
    customer: "العميل",
    jewelryItems: "قطع المجوهرات",
    totalAmount: "المبلغ الإجمالي",
    orderStatus: "حالة الطلب",
    paymentStatus: "حالة الدفع",
    date: "التاريخ",
    action: "الإجراء",
    viewDetails: "عرض التفاصيل",
    generateInvoice: "إصدار الفاتورة",
    updateStatus: "تحديث الحالة",

    topPerformingJewelry: "المجوهرات الأكثر مبيعاً",
    topPerformingDesc: "قطع المجوهرات الأعلى تحقيقاً للإيراد هذا الشهر",
    sold: "تم بيعها",
    outOfStock: "نفذت الكمية",

    recentActivityLedger: "سجل العمليات الأخير",
    auditTrailDesc: "مسار التتبع للعمليات والتغييرات في النظام",

    statePreview: "معاينة الحالات:",
    testConditions: "اختبار ظروف العرض",
    normalView: "عادي",
    loadingSkeleton: "جاري التحميل",
    emptyState: "فارغ",
    noDataTitle: "لا توجد بيانات عمليات حالية",
    noDataDesc: "سجل المبيعات والمنتجات فارغ حالياً. ابدأ بإضافة أسعار الذهب والمنتج الأول.",
    returnToNormal: "العودة للعرض الرئيسي",
  },
  tr: {
    workspace: "Yönetici Çalışma Alanı",
    operationsControlRoom: "Operasyon Kontrol Merkezi",
    adminSubtitle: "Canlı mücevher envanteri, altın gram fiyatları ve sipariş takibi.",
    dashboard: "Kontrol Paneli",
    catalog: "Mücevher Kataloğu",
    media: "Medya Kütüphanesi",
    settings: "Genel Ayarlar",
    live: "Canlı",
    liveGoldMarketRates: "Canlı Altın Piyasa Fiyatları (TL / Gram)",
    perGram: "gram",
    gold24k: "24 Ayar Altın",
    gold22k: "22 Ayar Altın",
    gold18k: "18 Ayar Altın",

    today: "Bugün",
    days7: "7 Gün",
    days30: "30 Gün",
    ytd: "Yıl Başı",

    refreshRates: "Fiyatları Yenile",
    quickActions: "Hızlı Operatör Eylemleri",
    quickActionsDesc: "En sık kullanılan yönetim görevleri",
    addNewJewelry: "+ Yeni Mücevher Ekle",
    updateGoldRates: "Altın Fiyatlarını Güncelle",
    fulfillOrders: "Bekleyen Siparişleri İşle",
    uploadCertificate: "GIA Sertifikası Yükle",
    exportReport: "Raporu Dışa Aktar",

    totalSalesRevenue: "Toplam Satış Geliri",
    vsPreviousMonth: "geçen aya göre",
    activeOpenOrders: "Aktif Siparişler",
    inFulfillmentQueue: "hazırlık kuyruğunda",
    pendingPaymentVerification: "ödeme onayı bekliyor",
    catalogInventory: "Katalog Envanteri",
    activeJewelryItems: "aktif mücevher ürünü",
    goldWeightSummary: "toplam altın ağırlığı",
    lowStockAlerts: "Düşük Stok Uyarıları",
    itemsNeedReorder: "ürün yeniden sipariş edilmeli",

    salesRevenueTrend: "Satış Gelir Trendi",
    monthlyRevenueBreakdown: "Özel tasarım ve katalog ürünleri gelir dağılımı",
    revenueByKrat: "Ayarlara Göre Gelir Dağılımı",
    goldPuritySales: "Altın saflık oranı satış payı",
    customOrders: "Özel Siparişler",
    standardCatalog: "Standart Katalog",
    peak: "En Yüksek",
    bangleInsight: "💡 22 Ayar Bilezik takımları bu ay en yüksek satışı gerçekleştirdi.",

    fulfillmentLifecycle: "Sipariş Tamamlama Döngüsü",
    orderProgression: "Mevcut sipariş süreçlerinin durumu",
    inventoryHealth: "Stok Sağlığı ve Eşikler",
    stockLevelsAndWarnings: "Stok seviyeleri ve kritik uyarılar",
    actionItems: "Eylem Gerektiren",

    recentOrders: "Son Siparişler",
    recentOrdersDesc: "En son müşteri alışverişleri ve teslimat durumları",
    orderId: "Sipariş No",
    customer: "Müşteri",
    jewelryItems: "Mücevher Ürünleri",
    totalAmount: "Toplam Tutar",
    orderStatus: "Sipariş Durumu",
    paymentStatus: "Ödeme Durumu",
    date: "Tarih",
    action: "İşlem",
    viewDetails: "Detayları Gör",
    generateInvoice: "Fatura Oluştur",
    updateStatus: "Durumu Güncelle",

    topPerformingJewelry: "En Çok Satan Mücevherler",
    topPerformingDesc: "Bu ay en yüksek ciro yapan mücevher modelleri",
    sold: "adet satıldı",
    outOfStock: "Stok Tükendi",

    recentActivityLedger: "Son İşlem Kayıtları",
    auditTrailDesc: "Sistem güncellemeleri ve güvenlik izleme kaydı",

    statePreview: "Durum Önizleme:",
    testConditions: "Farklı veri durumlarını test edin",
    normalView: "Normal",
    loadingSkeleton: "Yükleniyor",
    emptyState: "Boş",
    noDataTitle: "Operasyonel Veri Bulunamadı",
    noDataDesc: "Mücevher kataloğunuz ve satış kayıtlarınız şu anda boş. İlk altın fiyatlarınızı ekleyerek başlayın.",
    returnToNormal: "Ana Görünüme Dön",
  },
  en: {
    workspace: "Admin Workspace",
    operationsControlRoom: "Operations Control Room",
    adminSubtitle: "Real-time jewelry inventory management, gold spot rates, and sales performance.",
    dashboard: "Dashboard",
    catalog: "Jewelry Catalog",
    media: "Media Library",
    settings: "General Settings",
    live: "Live",
    liveGoldMarketRates: "Live Gold Market Base Rates (Per Gram)",
    perGram: "gram",
    gold24k: "24K Gold",
    gold22k: "22K Gold",
    gold18k: "18K Gold",

    today: "Today",
    days7: "7 Days",
    days30: "30 Days",
    ytd: "YTD",

    refreshRates: "Refresh Rates",
    quickActions: "Quick Operator Actions",
    quickActionsDesc: "Frequently used management tasks",
    addNewJewelry: "+ Add New Jewelry Item",
    updateGoldRates: "Update Gold Rates",
    fulfillOrders: "Fulfill Pending Orders",
    uploadCertificate: "Upload Certificate",
    exportReport: "Export Sales Report",

    totalSalesRevenue: "Total Sales Revenue",
    vsPreviousMonth: "vs. previous month",
    activeOpenOrders: "Active Open Orders",
    inFulfillmentQueue: "in fulfillment queue",
    pendingPaymentVerification: "pending payment verification",
    catalogInventory: "Catalog Inventory",
    activeJewelryItems: "active jewelry items",
    goldWeightSummary: "total gold weight",
    lowStockAlerts: "Low Stock Alerts",
    itemsNeedReorder: "items need reorder",

    salesRevenueTrend: "Sales Revenue Trend",
    monthlyRevenueBreakdown: "Monthly revenue breakdown across custom orders and catalog",
    revenueByKrat: "Revenue by Karat",
    goldPuritySales: "Gold purity sales proportion",
    customOrders: "Custom Orders",
    standardCatalog: "Standard Catalog",
    peak: "Peak",
    bangleInsight: "💡 22K Gold Bangles represent the highest demand category this month.",

    fulfillmentLifecycle: "Fulfillment Lifecycle",
    orderProgression: "Order progression across active processing states",
    inventoryHealth: "Inventory Health",
    stockLevelsAndWarnings: "Stock levels and reorder warnings",
    actionItems: "Action Items",

    recentOrders: "Recent Orders",
    recentOrdersDesc: "Latest customer purchases and order fulfillment statuses",
    orderId: "Order ID",
    customer: "Customer",
    jewelryItems: "Jewelry Items",
    totalAmount: "Total Amount",
    orderStatus: "Order Status",
    paymentStatus: "Payment",
    date: "Date",
    action: "Action",
    viewDetails: "View Details",
    generateInvoice: "Generate Invoice",
    updateStatus: "Update Status",

    topPerformingJewelry: "Top Performing Jewelry",
    topPerformingDesc: "Highest revenue generating items this month",
    sold: "sold",
    outOfStock: "Out of Stock",

    recentActivityLedger: "Recent Activity Ledger",
    auditTrailDesc: "Audit trail of system changes and high-value actions",

    statePreview: "State Preview:",
    testConditions: "Test layout under different conditions",
    normalView: "Normal",
    loadingSkeleton: "Loading",
    emptyState: "Empty",
    noDataTitle: "No Dashboard Operations Data Available",
    noDataDesc: "Your jewelry catalog and sales logs are currently empty. Start by adding your gold base rates and first product.",
    returnToNormal: "Return to Normal Dashboard",
  },
};
