
// Upload care initialize

<script>
  UPLOADCARE_PUBLIC_KEY = '4c05a24f9e4a4c3b032e';
  UPLOADCARE_TABS = 'file facebook instagram';
  UPLOADCARE_EFFECTS = 'crop';
  UPLOADCARE_IMAGE_SHRINK = '1600x1600';
  UPLOADCARE_IMAGES_ONLY = true;
  UPLOADCARE_PREVIEW_STEP = true;
</script>

<script src="https://ucarecdn.com/libs/widget/3.x/uploadcare.full.min.js"></script>
<script src="https://ucarecdn.com/libs/widget-tab-effects/1.x/uploadcare.tab-effects.js"></script>

<script>
  uploadcare.registerTab('preview', uploadcareTabEffects)
</script>