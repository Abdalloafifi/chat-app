import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, updateUserProfile, uploadProfilePhoto } from "../redux/apicalls/profileapi";
import "./profilePage.css";
import EditContentModal from './EditContentModal';



export default function ProfilePage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();

  const profile = useSelector((state) => state.profile.profile);
  const user = useSelector((state) => state.auth.user);

  // حالات لتعديل الوصف
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [updatedDescription, setUpdatedDescription] = useState('');

  // حالات لتعديل الصورة
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  // حالة المودال لتعديل المحتوى
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchUserProfile(id));
  }, [dispatch, id, location]);

  useEffect(() => {
    if (profile) {
      setUpdatedDescription(profile.description || '');
    }
  }, [profile]);

  const handleDescriptionEdit = () => {
    setIsEditingDescription(true);
  };

  const handleDescriptionChange = (e) => {
    setUpdatedDescription(e.target.value);
  };

  const handleDescriptionSave = () => {
    // يمكن هنا تجهيز كائن جديد لتحديث الوصف فقط أو مع باقي بيانات البروفايل
    dispatch(updateUserProfile({ id: profile._id, user: { ...profile, description: updatedDescription } }));
    setIsEditingDescription(false);
  };

  const handlePhotoIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleUploadPhoto = () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append('avatarProfile', selectedImage);
      dispatch(uploadProfilePhoto({ id: profile._id, formData }));
      setSelectedImage(null);
    }
  };

  const handleModalSubmit = (data) => {
    dispatch(updateUserProfile({ id: profile._id, user: data }));
  };

  if (!profile) {
    return (
      <div className="loader-overlay">
        <div className="galaxy-loader">
          {/* Cosmic Spinner */}
          <div className="quantum-spinner">
            <div className="orbit"></div>
            <div className="orbit"></div>
            <div className="orbit"></div>
            <div className="pulsar-core"></div>
          </div>
  
          {/* Animated Arabic Text */}
          <div className="loader-text-container">
            <h1 className="neon-arabic-text">
              <span>ج</span>
              <span>َ</span>
              <span>ار</span>
              <span>ِ</span>
              <span>ي</span>
              <span className="text-flicker"> الت</span>
              <span className="text-glitch">ح</span>
              <span>م</span>
              <span>ي</span>
              <span>ل</span>
            </h1>
            <p className="sub-text">برجاء الانتظار بينما نعد عالمك...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="profile-section">
      <div className="container py-5">
        <div className="row">
          {/* Sidebar */}
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center position-relative">
                <div className="avatar-wrapper" style={{ position: 'relative', display: 'inline-block' }}>
                  <img
                    src={profile?.avatar}
                    alt="avatar"
                    className="rounded-circle avatar"
                  />
                  {/* أيقونة الكاميرا في أسفل اليمين */}
                  {user.id === profile?._id && (
                    <button
                      className="photo-update-btn"
                      onClick={handlePhotoIconClick}
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <i className="bi bi-camera" style={{ fontSize: '1.5rem', color: '#000' }}></i>
                    </button>
                  )}
                </div>
                {/* input خفي لاختيار الصورة */}
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                {/* زر الرفع يظهر عند اختيار صورة */}
                {selectedImage && (
                  <button className="btn btn-primary mt-2" onClick={handleUploadPhoto}>
                    رفع الصورة
                  </button>
                )}
                <br />
                <br />
                {/* تعديل الوصف */}
                {user.id === profile?._id && (
                  <>
                    {isEditingDescription ? (
                      <div className="description-edit-container">
                        <input
                          type="text"
                          value={updatedDescription}
                          onChange={handleDescriptionChange}
                          className="description-input"
                          placeholder="أضف وصفك هنا..."
                        />
                        <div className="description-buttons">
                          <button className="btn-save" onClick={handleDescriptionSave}>
                            <i className="bi bi-check-lg"></i> تأكيد
                          </button>
                          <button
                            className="btn-cancel"
                            onClick={() => setIsEditingDescription(false)}
                          >
                            <i className="bi bi-x-lg"></i> إلغاء
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="profile-description">
                        {profile?.description || "لا يوجد وصف"}
                        <button
                          className="btn-edit-description"
                          onClick={handleDescriptionEdit}
                        >
                          <i className="bi bi-pencil-square"></i>
                        </button>
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row detail-row">
                  <div className="col-sm-3">
                    <p className="mb-0">Full Name</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{profile?.username}</p>
                  </div>
                </div>
                <hr />
                <div className="row detail-row">
                  <div className="col-sm-3">
                    <p className="mb-0">Phone</p>
                  </div>
                  <div className="col-sm-9">
                    {profile?.phone ? (
                      <p className="text-muted mb-0">{profile?.phone}</p>
                    ) : (
                      <p className="text-muted mb-0">I won't tell you😛</p>
                    )}
                  </div>
                </div>
                <hr />
                <div className="row detail-row">
                  <div className="col-sm-3">
                    <p className="mb-0">Address</p>
                  </div>
                  <div className="col-sm-9">
                    {profile?.Address ? (
                      <p className="text-muted mb-0">{profile?.Address}</p>
                    ) : (
                      <p className="text-muted mb-0">
                        I will keep it a secret until we get to know each other😁😁
                      </p>
                    )}

                  </div>
                </div>
                {/* زر تعديل المحتوي */}
                {user.id === profile?._id && (
                  <button
                    className="btn-edit-content"
                    onClick={() => setShowModal(true)}
                  >
                    <i className="bi bi-pencil-fill"></i>
                    تعديل المحتوي
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
      {showModal && (
        <EditContentModal
          profile={profile}
          onClose={() => setShowModal(false)}
          onSubmit={handleModalSubmit}
        />
      )}
    </section>
  );
}
