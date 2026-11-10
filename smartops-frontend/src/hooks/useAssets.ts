import { useCallback, useEffect, useState } from "react";
import { AssetRequest, AssetResponse } from "../types/assets/asset";
import { assetApi } from "../lib/core/api";
import { getErrorMessage } from "../lib/common/exceptions/errors";

export function useAssets() {
  const [assets, setAssets] = useState<AssetResponse[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setError(null);
      setAssets(await assetApi.list());
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const addAsset = async (data: AssetRequest) => {
    await assetApi.create(data);
    await load();
  };

  const updateAsset = async (id: number, data: AssetRequest) => {
    await assetApi.update(id, data);
    await load();
  };

  const removeAsset = async (id: number) => {
    await assetApi.remove(id);
    await load();
  };

  return { assets, loading, error, addAsset, updateAsset, removeAsset };
}
