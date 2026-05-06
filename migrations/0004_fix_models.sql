-- Fix: el seed inicial apuntaba a /models/cube-demo.glb pero ese archivo
-- no existe. Lo dejamos NULL para que el componente Showroom3D use el
-- modelo de demo público de model-viewer como fallback.

UPDATE listings SET model_glb_url = NULL WHERE model_glb_url = '/models/cube-demo.glb';
