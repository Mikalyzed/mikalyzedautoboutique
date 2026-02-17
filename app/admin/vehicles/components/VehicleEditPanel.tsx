"use client";

import { useState } from "react";
import type { DynamoVehicle } from "@/lib/vehicles";
import Modal from "../../components/Modal";
import ToggleSwitch from "../../components/ToggleSwitch";

interface VehicleEditPanelProps {
  vehicle: DynamoVehicle;
  onClose: () => void;
  onSaved: (vehicle: DynamoVehicle) => void;
}

export default function VehicleEditPanel({
  vehicle,
  onClose,
  onSaved,
}: VehicleEditPanelProps) {
  const [manualPrice, setManualPrice] = useState(vehicle.manualPrice || "");
  const [manualDescription, setManualDescription] = useState(
    vehicle.manualDescription || ""
  );
  const [manualImagesText, setManualImagesText] = useState(
    (vehicle.manualImages || []).join("\n")
  );
  const [manuallyMarkedSold, setManuallyMarkedSold] = useState(
    !!vehicle.manuallyMarkedSold
  );
  const [featured, setFeatured] = useState(!!vehicle.featured);
  const [hidden, setHidden] = useState(!!vehicle.hidden);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    try {
      const manualImages = manualImagesText
        .split("\n")
        .map((u) => u.trim())
        .filter(Boolean);

      const overrides: Record<string, unknown> = {
        manualPrice: manualPrice || undefined,
        manualDescription: manualDescription || undefined,
        manualImages: manualImages.length > 0 ? manualImages : undefined,
        manuallyMarkedSold,
        featured,
        hidden,
      };

      const res = await fetch("/api/admin/vehicles/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vin: vehicle.vin, overrides }),
      });

      if (res.ok) {
        const { vehicle: updated } = await res.json();
        onSaved(updated);
      }
    } catch (error) {
      console.error("Save failed:", error);
    }
    setSaving(false);
  }

  const inputClass =
    "w-full bg-black/20 backdrop-blur-sm border border-zinc-800/50 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#dffd6e] transition font-light text-sm";

  return (
    <Modal
      open={true}
      onClose={onClose}
      title={`Edit ${vehicle.year} ${vehicle.make} ${vehicle.model}`}
    >
      <div className="space-y-6">
        {/* Synced info (read-only) */}
        <div className="bg-zinc-800/30 rounded-xl p-4">
          <p className="text-zinc-500 text-xs uppercase tracking-wider mb-3">
            Synced from DealerCenter (read-only)
          </p>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-zinc-500 text-xs">VIN</p>
              <p className="text-white font-mono text-xs">{vehicle.vin}</p>
            </div>
            <div>
              <p className="text-zinc-500 text-xs">Price</p>
              <p className="text-white">{vehicle.price}</p>
            </div>
            <div>
              <p className="text-zinc-500 text-xs">Status</p>
              <p className="text-white">{vehicle.status}</p>
            </div>
            <div>
              <p className="text-zinc-500 text-xs">Images</p>
              <p className="text-white">{vehicle.images.length} photos</p>
            </div>
          </div>
        </div>

        {/* Override fields */}
        <div className="space-y-4">
          <p className="text-zinc-500 text-xs uppercase tracking-wider">
            Admin Overrides
          </p>

          <div>
            <label className="text-zinc-400 text-xs mb-1 block">
              Manual Price Override
            </label>
            <input
              type="text"
              value={manualPrice}
              onChange={(e) => setManualPrice(e.target.value)}
              placeholder="e.g. $125,000"
              className={inputClass}
            />
          </div>

          <div>
            <label className="text-zinc-400 text-xs mb-1 block">
              Manual Description Override
            </label>
            <textarea
              value={manualDescription}
              onChange={(e) => setManualDescription(e.target.value)}
              placeholder="Override the DealerCenter description..."
              rows={4}
              className={inputClass + " resize-y"}
            />
          </div>

          <div>
            <label className="text-zinc-400 text-xs mb-1 block">
              Manual Image URLs (one per line)
            </label>
            <textarea
              value={manualImagesText}
              onChange={(e) => setManualImagesText(e.target.value)}
              placeholder="https://example.com/image1.jpg"
              rows={3}
              className={inputClass + " resize-y font-mono"}
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-white text-sm">Mark as Sold</p>
              <p className="text-zinc-500 text-xs">
                Override sync status to sold
              </p>
            </div>
            <ToggleSwitch
              checked={manuallyMarkedSold}
              onChange={setManuallyMarkedSold}
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-white text-sm">Featured</p>
              <p className="text-zinc-500 text-xs">
                Highlight on homepage
              </p>
            </div>
            <ToggleSwitch checked={featured} onChange={setFeatured} />
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-white text-sm">Hidden</p>
              <p className="text-zinc-500 text-xs">
                Hide from public inventory
              </p>
            </div>
            <ToggleSwitch checked={hidden} onChange={setHidden} />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800/40">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 rounded-lg text-sm bg-[#dffd6e] text-black font-medium hover:bg-[#dffd6e]/90 transition disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
