"use client";

import { useState } from "react";
import type { DynamoVehicle } from "@/lib/vehicles";
import Modal from "../../components/Modal";
import ToggleSwitch from "../../components/ToggleSwitch";

interface VehicleEditPanelProps {
  vehicle: DynamoVehicle;
  onClose: () => void;
  onSaved: (vehicle: DynamoVehicle) => void;
  onDeleted?: (vin: string) => void;
}

export default function VehicleEditPanel({
  vehicle,
  onClose,
  onSaved,
  onDeleted,
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
  const [auction, setAuction] = useState(!!vehicle.auction);
  const [auctionHouse, setAuctionHouse] = useState(vehicle.auctionHouse || "");
  const [auctionUrl, setAuctionUrl] = useState(vehicle.auctionUrl || "");
  const [auctionDate, setAuctionDate] = useState(vehicle.auctionDate || "");
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

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
        auction,
        auctionHouse: auction ? auctionHouse || undefined : undefined,
        auctionUrl: auction ? auctionUrl || undefined : undefined,
        auctionDate: auction ? auctionDate || undefined : undefined,
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

          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-white text-sm">Set for Auction</p>
              <p className="text-zinc-500 text-xs">
                Removes reserve &amp; financing buttons
              </p>
            </div>
            <ToggleSwitch checked={auction} onChange={setAuction} />
          </div>

          {auction && (
            <div className="space-y-3 pl-2 border-l-2 border-amber-500/30 ml-1">
              <div>
                <label className="text-zinc-400 text-xs mb-1 block">
                  Auction House
                </label>
                <input
                  type="text"
                  value={auctionHouse}
                  onChange={(e) => setAuctionHouse(e.target.value)}
                  placeholder='e.g. "Bring a Trailer"'
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-zinc-400 text-xs mb-1 block">
                  Auction Date (optional)
                </label>
                <input
                  type="date"
                  value={auctionDate}
                  onChange={(e) => setAuctionDate(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-zinc-400 text-xs mb-1 block">
                  Auction Listing URL (optional — add when live)
                </label>
                <input
                  type="url"
                  value={auctionUrl}
                  onChange={(e) => setAuctionUrl(e.target.value)}
                  placeholder="https://bringatrailer.com/listing/..."
                  className={inputClass}
                />
              </div>
            </div>
          )}
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

        {/* Delete — only for sold vehicles */}
        {vehicle.status === "sold" && onDeleted && (
          <div className="pt-4 border-t border-zinc-800/40">
            {!confirmDelete ? (
              <button
                onClick={() => setConfirmDelete(true)}
                className="w-full px-4 py-2.5 rounded-lg text-sm text-red-400 border border-red-500/30 hover:bg-red-500/10 transition"
              >
                Delete Vehicle
              </button>
            ) : (
              <div className="space-y-3">
                <p className="text-red-400 text-sm">
                  Permanently delete this vehicle from the database? This cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setConfirmDelete(false)}
                    className="flex-1 px-4 py-2 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={async () => {
                      setDeleting(true);
                      try {
                        const res = await fetch("/api/admin/vehicles/update", {
                          method: "DELETE",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ vin: vehicle.vin }),
                        });
                        if (res.ok) {
                          onDeleted(vehicle.vin);
                        }
                      } catch (error) {
                        console.error("Delete failed:", error);
                      }
                      setDeleting(false);
                    }}
                    disabled={deleting}
                    className="flex-1 px-4 py-2 rounded-lg text-sm bg-red-600 text-white font-medium hover:bg-red-700 transition disabled:opacity-50"
                  >
                    {deleting ? "Deleting..." : "Confirm Delete"}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}
