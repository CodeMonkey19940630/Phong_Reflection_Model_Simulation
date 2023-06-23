#version 450
#extension GL_ARB_separate_shader_objects : enable

layout(binding = 0) uniform UniformBufferObject {
    mat4 model;
    mat4 view;
    mat4 proj;
} ubo;

layout(binding = 1) uniform LightingConstants {
    vec4 lightPosition;
    vec3 lightAmbient;
    vec3 lightDiffuse;
    vec4 lightSpecular;
    vec3 lightAttenuation;

} lighting;



layout(location = 0) in vec4 inPosition;
layout(location = 1) in vec3 inColor;
layout(location = 2) in vec2 inTexCoord;
layout(location = 3) in vec3 inNormal;

layout(location = 0) out vec3 fragColor;
layout(location = 1) out vec2 fragTexCoord;
layout(location = 2) out vec3 fragLightVector;
layout(location = 3) out vec3 fragEyeVector;
layout(location = 4) out vec3 fragSpecularLighting;
layout(location = 5) out vec3 fragDiffuseLighting;
layout(location = 6) out vec3 fragAmbientLighting;
layout(location = 7) out float fragSpecularCoefficient;
layout(location = 8) out vec3 fragNormal;
layout(location = 9) out vec3 fragLightAttenuation;


void main() {
   
   vec4 VCS_position = ubo.view * ubo.model * inPosition;

   fragNormal = mat3(ubo.view) * mat3(ubo.model) * inNormal;

   fragLightVector = (ubo.view * lighting.lightPosition - VCS_position).xyz;

   fragEyeVector = (- VCS_position).xyz;

   gl_Position = ubo.proj * VCS_position;

   fragColor = inColor;

   fragTexCoord = inTexCoord;

   fragSpecularLighting = lighting.lightSpecular.xyz;
   fragDiffuseLighting  = lighting.lightDiffuse;
   fragAmbientLighting  = lighting.lightAmbient;
   fragSpecularCoefficient = lighting.lightSpecular.w;
   fragLightAttenuation = lighting.lightAttenuation;


}